/** Shrink a photo in the browser so up to 8 images stay under the hosting upload limit. */
async function shrink(file: File, max = 1600, quality = 0.82): Promise<File> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

/** POST a form to /api/enquiry. Resolves true when the enquiry reached Telegram. */
export async function submitEnquiry(form: HTMLFormElement, extra: Record<string, string>, photos: File[] = []) {
  const data = new FormData(form);
  data.delete("photos");
  for (const [k, v] of Object.entries(extra)) data.set(k, v);
  for (const p of await Promise.all(photos.map((f) => shrink(f)))) data.append("photos", p);
  try {
    const res = await fetch("/api/enquiry", { method: "POST", body: data });
    return res.ok;
  } catch {
    return false;
  }
}
