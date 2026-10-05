/**
 * Receives the Request-access and Sell-your-car forms and forwards them to Telegram.
 * Credentials come from env (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) — never from the client.
 */

const MAX_PHOTOS = 8;
const MAX_FIELD = 500;
const MAX_PHOTO_BYTES = 5 * 1048576; // photos arrive compressed by the browser

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
const clean = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim().slice(0, MAX_FIELD) : "");

async function tg(method: string, body: BodyInit) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, { method: "POST", body });
  if (!res.ok) throw new Error(`telegram ${method} ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) {
    return Response.json({ ok: false, error: "not-configured" }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // honeypot: real visitors never fill this hidden field
  if (clean(form.get("company"))) return Response.json({ ok: true });

  const kind = clean(form.get("kind")) === "sell" ? "sell" : "access";
  const name = clean(form.get("name"));
  const phone = clean(form.get("phone"));
  if (!name || !phone) return Response.json({ ok: false, error: "missing-fields" }, { status: 400 });

  const fields: [string, string][] =
    kind === "sell"
      ? [
          ["Марка", clean(form.get("brand"))],
          ["Модель", clean(form.get("model"))],
          ["Год", clean(form.get("year"))],
          ["Пробег", clean(form.get("mileage"))],
          ["Состояние", clean(form.get("condition"))],
          ["Имя", name],
          ["Телефон", phone],
        ]
      : [
          ["Интерес", clean(form.get("interest"))],
          ["Имя", name],
          ["Телефон", phone],
          ["Email", clean(form.get("email"))],
          ["Связь", clean(form.get("method"))],
          ["Сообщение", clean(form.get("message"))],
        ];

  const lang = clean(form.get("lang")).toUpperCase();
  const title = kind === "sell" ? "🚗 Продажа автомобиля" : "🔑 Запрос доступа";
  const text = [
    `<b>${title}</b>${lang ? ` · ${esc(lang)}` : ""}`,
    "",
    ...fields.filter(([, v]) => v).map(([k, v]) => `<b>${k}:</b> ${esc(v)}`),
  ].join("\n");

  try {
    const msg = new FormData();
    msg.set("chat_id", chatId);
    msg.set("parse_mode", "HTML");
    msg.set("text", text);
    await tg("sendMessage", msg);

    const photos = form
      .getAll("photos")
      .filter((f): f is File => f instanceof File && f.size > 0 && f.size <= MAX_PHOTO_BYTES && ["image/jpeg", "image/png", "image/webp"].includes(f.type))
      .slice(0, MAX_PHOTOS);
    if (photos.length === 1) {
      const p = new FormData();
      p.set("chat_id", chatId);
      p.set("photo", photos[0], photos[0].name);
      await tg("sendPhoto", p);
    } else if (photos.length > 1) {
      const g = new FormData();
      g.set("chat_id", chatId);
      g.set("media", JSON.stringify(photos.map((_, i) => ({ type: "photo", media: `attach://p${i}` }))));
      photos.forEach((f, i) => g.set(`p${i}`, f, f.name));
      await tg("sendMediaGroup", g);
    }
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, error: "delivery-failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
