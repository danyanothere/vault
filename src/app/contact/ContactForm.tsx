"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/Button";

const interests = [
  { id: "specific", label: "A specific vehicle" },
  { id: "collection", label: "Something from the collection" },
  { id: "auction", label: "Private auction" },
  { id: "sourcing", label: "Vehicle sourcing" },
  { id: "other", label: "Other" },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState("specific");

  // ?interest=auction preselects an option (used by "Request to bid")
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("interest");
    if (q && interests.some((i) => i.id === q)) queueMicrotask(() => setInterest(q));
  }, []);

  return (
    <div className="request-grid">
      <div className="request-copy">
        <h1 className="title-xl">
          Request
          <br />
          access
        </h1>
        <p className="body-muted">Let&apos;s discuss your next automobile.</p>
      </div>

      {sent ? (
        <div className="form-panel request-panel" role="status">
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
      ) : (
        <form
          className="form-panel request-panel"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <fieldset className="field radio-field">
            <legend>I&apos;m looking for:</legend>
            {interests.map((c) => (
              <label key={c.id} className="radio">
                <input type="radio" name="interest" value={c.id} checked={interest === c.id} onChange={() => setInterest(c.id)} />
                <span>{c.label}</span>
              </label>
            ))}
          </fieldset>
          <div className="request-fields">
            <div className="field">
              <label htmlFor="c-name" className="sr-only">Your name</label>
              <input id="c-name" name="name" autoComplete="name" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="c-phone" className="sr-only">Phone / WhatsApp</label>
              <input id="c-phone" name="phone" type="tel" autoComplete="tel" required placeholder="Phone / WhatsApp" />
            </div>
            <div className="field">
              <label htmlFor="c-email" className="sr-only">Email (optional)</label>
              <input id="c-email" name="email" type="email" autoComplete="email" placeholder="Email (optional)" />
            </div>
            <div className="field">
              <label htmlFor="c-method" className="sr-only">Preferred contact method</label>
              <select id="c-method" name="method" defaultValue="">
                <option value="" disabled>
                  Preferred contact method
                </option>
                <option>Phone</option>
                <option>WhatsApp</option>
                <option>Email</option>
              </select>
            </div>
            <Button type="submit" arrow className="btn-block">
              Send request
            </Button>
            <p className="microcopy">
              Your enquiry will be handled personally
              <br />
              and confidentially.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
