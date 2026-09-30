"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/Button";

const interests = ["A specific vehicle", "Something from the collection", "Private auction", "Vehicle sourcing", "Other"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-panel" role="status">
        <div className="success">
          <span className="success-icon">
            <Check size={22} strokeWidth={1.3} />
          </span>
          <h2 className="title-lg">Request received.</h2>
          <p className="body-muted">Thank you. A member of our team will be in touch personally and in confidence.</p>
          <Button variant="ghost" onClick={() => setSent(false)}>
            Send another request
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
        <fieldset className="field field-full">
          <legend>I am interested in</legend>
          <div className="choice-list">
            {interests.map((c, i) => (
              <label key={c} className="choice">
                <input type="radio" name="interest" value={c} defaultChecked={i === 0} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone / WhatsApp</label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="c-method">Preferred contact method</label>
          <select id="c-method" name="method" defaultValue="Phone">
            <option>Phone</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor="c-msg">Message (optional)</label>
          <textarea id="c-msg" name="message" />
        </div>
      </div>
      <div className="form-foot">
        <p className="microcopy">Your enquiry will be handled personally and confidentially.</p>
        <Button type="submit" arrow>
          Send request
        </Button>
      </div>
    </form>
  );
}
