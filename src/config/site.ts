/**
 * Business contact details. Fill these in with the owner's real data.
 * Any value left as null hides the matching action across the site
 * (header phone, "Call us" buttons, chat widget, footer socials) — no fake numbers are shown.
 */
export const siteConfig = {
  /** Public site URL, used for canonical / hreflang / sitemap / Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  contact: {
    /** Display format, e.g. "+40 7xx xxx xxx" */
    phone: null as string | null,
    /** Digits only with country code, e.g. "407xxxxxxxx" */
    whatsapp: null as string | null,
  },
  social: {
    instagram: null as string | null,
    youtube: null as string | null,
    telegram: null as string | null,
  },
  /** ISO date of the next private auction; null shows "date available to verified clients". */
  nextAuction: null as string | null,
};

export const phoneHref = siteConfig.contact.phone ? `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}` : null;
export const whatsappHref = siteConfig.contact.whatsapp ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}` : null;
