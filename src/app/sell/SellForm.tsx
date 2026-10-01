"use client";

import { useState } from "react";
import { Check, ImagePlus, X } from "lucide-react";
import Button from "@/components/Button";

const MAX_PHOTOS = 8;

export default function SellForm() {
  const [sent, setSent] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [note, setNote] = useState("");

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const all = [...photos, ...Array.from(list).filter((f) => f.type.startsWith("image/"))];
    setNote(all.length > MAX_PHOTOS ? `Only the first ${MAX_PHOTOS} images were kept.` : "");
    setPhotos(all.slice(0, MAX_PHOTOS));
  };

  if (sent) {
    return (
      <div className="form-panel" role="status">
        <div className="success">
          <span className="success-icon">
            <Check size={22} strokeWidth={1.3} />
          </span>
          <h2 className="title-lg">Thank you.</h2>
          <p className="body-muted">Your vehicle details have been received. A member of our team will contact you personally within one business day.</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSent(false);
              setPhotos([]);
            }}
          >
            Submit another vehicle
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="form-panel form-compact"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="brand">Brand</label>
          <input id="brand" name="brand" required placeholder="Brand" />
        </div>
        <div className="field">
          <label htmlFor="model">Model</label>
          <input id="model" name="model" required placeholder="Model" />
        </div>
        <div className="field">
          <label htmlFor="year">Year</label>
          <input id="year" name="year" inputMode="numeric" pattern="(19|20)[0-9]{2}" required placeholder="Year" />
        </div>
        <div className="field">
          <label htmlFor="mileage">Mileage</label>
          <input id="mileage" name="mileage" inputMode="numeric" placeholder="Mileage" />
        </div>
        <div className="field field-full">
          <label htmlFor="condition">Condition</label>
          <select id="condition" name="condition" defaultValue="">
            <option value="" disabled>
              Condition
            </option>
            <option>Concours</option>
            <option>Excellent</option>
            <option>Very good</option>
            <option>Good</option>
          </select>
        </div>
        <div className="field field-full">
          <span className="field-label" id="photos-label">
            Photos
          </span>
          <label className="upload" aria-labelledby="photos-label">
            <ImagePlus size={20} strokeWidth={1.1} aria-hidden="true" />
            <span>Add photos</span>
            <small>Maximum {MAX_PHOTOS} images</small>
            <input type="file" accept="image/*" multiple disabled={photos.length >= MAX_PHOTOS} onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </label>
          {photos.length > 0 && (
            <ul className="upload-list" aria-label="Selected photos">
              {photos.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <span>{f.name}</span>
                  <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setPhotos(photos.filter((_, j) => j !== i))}>
                    <X size={12} strokeWidth={1.4} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {note && <p className="microcopy">{note}</p>}
        </div>
        <div className="field field-full">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" required placeholder="Your name" />
        </div>
        <div className="field field-full">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="Phone / WhatsApp" />
        </div>
      </div>
      <div className="form-foot">
        <Button type="submit" arrow>
          Submit vehicle
        </Button>
        <p className="microcopy">{photos.length}/{MAX_PHOTOS} photos · handled confidentially.</p>
      </div>
    </form>
  );
}
