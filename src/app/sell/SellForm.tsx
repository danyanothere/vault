"use client";

import { useState } from "react";
import { Check, Upload } from "lucide-react";
import Button from "@/components/Button";

export default function SellForm() {
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState(0);

  if (sent) {
    return (
      <div className="form-panel" role="status">
        <div className="success">
          <span className="success-icon">
            <Check size={22} strokeWidth={1.3} />
          </span>
          <h2 className="title-lg">Thank you.</h2>
          <p className="body-muted">
            Your vehicle details have been received. A member of our team will contact you personally within one
            business day.
          </p>
          <Button variant="ghost" onClick={() => setSent(false)}>
            Submit another vehicle
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="form-panel"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-grid">
        <div className="field">
          <label htmlFor="brand">Brand</label>
          <input id="brand" name="brand" required placeholder="Porsche" />
        </div>
        <div className="field">
          <label htmlFor="model">Model</label>
          <input id="model" name="model" required placeholder="911 Turbo S" />
        </div>
        <div className="field">
          <label htmlFor="year">Year</label>
          <input id="year" name="year" inputMode="numeric" pattern="[0-9]{4}" required placeholder="2022" />
        </div>
        <div className="field">
          <label htmlFor="mileage">Mileage</label>
          <input id="mileage" name="mileage" inputMode="numeric" placeholder="12 000 km" />
        </div>
        <div className="field field-full">
          <label htmlFor="condition">Condition</label>
          <select id="condition" name="condition" defaultValue="">
            <option value="" disabled>
              Select condition
            </option>
            <option>Concours</option>
            <option>Excellent</option>
            <option>Very good</option>
            <option>Good</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="field field-full">
          <span className="eyebrow">Photos</span>
          <label className="upload">
            <Upload size={20} strokeWidth={1.2} aria-hidden="true" />
            <span>{files ? `${files} photo${files > 1 ? "s" : ""} selected` : "Add photos of your vehicle"}</span>
            <input type="file" name="photos" accept="image/*" multiple onChange={(e) => setFiles(e.target.files?.length ?? 0)} />
          </label>
        </div>
      </div>
      <div className="form-foot">
        <p className="microcopy">Your details are handled personally and confidentially.</p>
        <Button type="submit" arrow>
          Submit vehicle
        </Button>
      </div>
    </form>
  );
}
