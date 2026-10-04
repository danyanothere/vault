"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/Button";
import { useDict, useLang } from "@/i18n/client";
import { submitEnquiry } from "@/lib/submit";

const interestIds = ["specific", "collection", "auction", "sourcing", "other"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const dict = useDict();
  const t = dict.contact;
  const lang = useLang();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const interests = interestIds.map((id, i) => ({ id, label: t.interests[i] }));
  const [interest, setInterest] = useState("specific");

  // ?interest=auction preselects an option (used by "Request to bid")
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("interest");
    if (q && interestIds.includes(q)) queueMicrotask(() => setInterest(q));
  }, []);

  return (
    <div className="request-grid">
      <div className="request-copy">
        <h1 className="title-xl">
          {t.title[0]}
          <br />
          {t.title[1]}
        </h1>
        <p className="body-muted">{t.text}</p>
      </div>

      {sent ? (
        <div className="form-panel request-panel" role="status">
          <div className="success">
            <span className="success-icon">
              <Check size={22} strokeWidth={1.3} />
            </span>
            <h2 className="title-lg">{t.thanks}</h2>
            <p className="body-muted">{t.thanksText}</p>
            <Button variant="ghost" onClick={() => setSent(false)}>
              {t.again}
            </Button>
          </div>
        </div>
      ) : (
        <form
          className="form-panel request-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError(false);
            const ok = await submitEnquiry(e.currentTarget, { kind: "access", lang });
            setBusy(false);
            if (ok) setSent(true);
            else setError(true);
          }}
        >
          <fieldset className="field radio-field">
            <legend>{t.looking}</legend>
            {interests.map((c) => (
              <label key={c.id} className="radio">
                <input type="radio" name="interest" value={c.id} checked={interest === c.id} onChange={() => setInterest(c.id)} />
                <span>{c.label}</span>
              </label>
            ))}
          </fieldset>
          <div className="request-fields">
            <div className="field">
              <label htmlFor="c-name" className="sr-only">{t.name}</label>
              <input id="c-name" name="name" autoComplete="name" required placeholder={t.name} />
            </div>
            <div className="field">
              <label htmlFor="c-phone" className="sr-only">{t.phone}</label>
              <input id="c-phone" name="phone" type="tel" autoComplete="tel" required placeholder={t.phone} />
            </div>
            <div className="field">
              <label htmlFor="c-email" className="sr-only">{t.email}</label>
              <input id="c-email" name="email" type="email" autoComplete="email" placeholder={t.email} />
            </div>
            <div className="field">
              <label htmlFor="c-method" className="sr-only">{t.method}</label>
              <select id="c-method" name="method" defaultValue="">
                <option value="" disabled>
                  {t.method}
                </option>
                {t.methods.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
            <Button type="submit" arrow={!busy} className="btn-block">
              {busy ? dict.common.sending : t.submit}
            </Button>
            {error && (
              <p className="form-error" role="alert">
                {dict.common.sendError}
              </p>
            )}
            <p className="microcopy">
              {t.micro[0]}
              <br />
              {t.micro[1]}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
