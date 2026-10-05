"use client";

import { useState } from "react";
import { Check, ImagePlus, X } from "lucide-react";
import Button from "@/components/Button";
import { useDict, useLang } from "@/i18n/client";
import { submitEnquiry } from "@/lib/submit";
import { fill } from "@/i18n/config";

const MAX_PHOTOS = 8;
const MAX_BYTES = 15 * 1048576;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function SellForm() {
  const [sent, setSent] = useState(false);
  const dict = useDict();
  const t = dict.sell;
  const lang = useLang();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [note, setNote] = useState("");

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const valid = incoming.filter((f) => ALLOWED.includes(f.type) && f.size <= MAX_BYTES);
    const fresh = valid.filter((f) => !photos.some((p) => p.name === f.name && p.size === f.size));
    const all = [...photos, ...fresh];
    const notes = [];
    if (valid.length < incoming.length) notes.push(fill(t.badFile, { mb: MAX_BYTES / 1048576 }));
    if (all.length > MAX_PHOTOS) notes.push(fill(t.tooMany, { n: MAX_PHOTOS }));
    setNote(notes.join(" "));
    setPhotos(all.slice(0, MAX_PHOTOS));
  };

  if (sent) {
    return (
      <div className="form-panel" role="status">
        <div className="success">
          <span className="success-icon">
            <Check size={22} strokeWidth={1.3} />
          </span>
          <h2 className="title-lg">{t.thanks}</h2>
          <p className="body-muted">{t.thanksText}</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSent(false);
              setPhotos([]);
            }}
          >
            {t.again}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="form-panel form-compact"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(false);
        const ok = await submitEnquiry(e.currentTarget, { kind: "sell", lang }, photos);
        setBusy(false);
        if (ok) setSent(true);
        else setError(true);
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="brand">{t.fields.brand}</label>
          <input id="brand" name="brand" required placeholder={t.fields.brand} />
        </div>
        <div className="field">
          <label htmlFor="model">{t.fields.model}</label>
          <input id="model" name="model" required placeholder={t.fields.model} />
        </div>
        <div className="field">
          <label htmlFor="year">{t.fields.year}</label>
          <input id="year" name="year" inputMode="numeric" pattern="(19|20)[0-9]{2}" required placeholder={t.fields.year} />
        </div>
        <div className="field">
          <label htmlFor="mileage">{t.fields.mileage}</label>
          <input id="mileage" name="mileage" inputMode="numeric" placeholder={t.fields.mileage} />
        </div>
        <div className="field field-full">
          <label htmlFor="condition">{t.fields.condition}</label>
          <select id="condition" name="condition" defaultValue="">
            <option value="" disabled>
              {t.fields.condition}
            </option>
            {t.conditions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field field-full">
          <span className="field-label" id="photos-label">
            {t.fields.photos}
          </span>
          <label className="upload" aria-labelledby="photos-label">
            <ImagePlus size={20} strokeWidth={1.1} aria-hidden="true" />
            <span>{t.addPhotos}</span>
            <small>{fill(t.maxPhotos, { n: MAX_PHOTOS })}</small>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={photos.length >= MAX_PHOTOS} onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </label>
          {photos.length > 0 && (
            <ul className="upload-list" aria-label={t.selected}>
              {photos.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <span>{f.name}</span>
                  <button type="button" aria-label={`${t.remove} ${f.name}`} onClick={() => setPhotos(photos.filter((_, j) => j !== i))}>
                    <X size={12} strokeWidth={1.4} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {note && (
            <p className="form-error" role="alert">
              {note}
            </p>
          )}
        </div>
        <div className="field field-full">
          <label htmlFor="name">{t.fields.name}</label>
          <input id="name" name="name" autoComplete="name" required placeholder={t.fields.name} />
        </div>
        <div className="field field-full">
          <label htmlFor="phone">{t.fields.phone}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder={t.fields.phone} />
        </div>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {dict.common.sendError}
        </p>
      )}
      <div className="form-foot">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
        <Button type="submit" arrow={!busy}>
          {busy ? dict.common.sending : t.submit}
        </Button>
        <p className="microcopy">{fill(t.counter, { count: photos.length, n: MAX_PHOTOS })}</p>
      </div>
    </form>
  );
}
