export type Img = { src: string; position?: string; alt: string };

export type GalleryCategory = "exterior" | "interior" | "details" | "wheels" | "engine" | "rear";

export type Spec = { value: string; label: string; icon: "engine" | "gearbox" | "drive" | "body" | "origin" };

export type Vehicle = {
  id: string;
  index: string;
  brand: string;
  /** model split into display lines, e.g. ["911 Turbo", "Cabriolet"] */
  modelLines: string[];
  subtitle: string;
  tagline: [string, string];
  description: string[];
  detailIntro: string;
  tags: string[];
  quickSpecs: string[];
  specs: Spec[];
  hero: Img;
  showcase: Img;
  thumbnail: Img;
  gallery: Partial<Record<GalleryCategory, Img[]>>;
  video: { src: string; poster: string };
  /** Barely-visible tint behind the vehicle (rgb triplet). */
  ambient: string;
  /** Scroll story: three oversized specs, then the closing line. */
  story: {
    specs: { big: string; unit?: string; label: string }[];
    final: string[];
  };
};

export const vehicles: Vehicle[] = [
  {
    id: "maserati-quattroporte",
    story: {
      specs: [
        { big: "V6", label: "3.0 L twin-turbo · Ferrari-built" },
        { big: "430", unit: "HP", label: "580 Nm of torque" },
        { big: "Q4", label: "Intelligent all-wheel drive" },
      ],
      final: ["Italian", "grand", "touring."],
    },
    ambient: "214, 150, 70",
    video: { src: "/videos/maserati.mp4", poster: "/videos/maserati-poster.webp" },
    index: "01",
    brand: "Maserati",
    modelLines: ["Quattroporte"],
    subtitle: "Italian Grand Touring",
    tagline: ["Italian", "grand touring."],
    description: ["A perfect balance of performance,", "luxury and timeless Italian design."],
    detailIntro: "A perfect balance of performance, luxury and timeless Italian design.",
    tags: ["Luxury", "Performance", "Elegance"],
    quickSpecs: ["3.0 L", "V6", "RWD / AWD", "Luxury sedan"],
    specs: [
      { value: "3.0 L", label: "V6", icon: "engine" },
      { value: "Automatic", label: "Transmission", icon: "gearbox" },
      { value: "RWD / AWD", label: "Drivetrain", icon: "drive" },
      { value: "Luxury sedan", label: "Body type", icon: "body" },
      { value: "Italy", label: "Origin", icon: "origin" },
    ],
    hero: { src: "/images/hero/maserati-showroom.webp", position: "62% 55%", alt: "Black Maserati Quattroporte in a private showroom" },
    showcase: { src: "/images/hero/maserati-showroom.webp", position: "70% 55%", alt: "Black Maserati Quattroporte" },
    thumbnail: { src: "/images/hero/maserati-showroom.webp", position: "72% 60%", alt: "" },
    gallery: {
      exterior: [{ src: "/images/experience/exterior/frame-02.webp", position: "50% 55%", alt: "Maserati Quattroporte, front three-quarter" }],
      interior: [{ src: "/images/experience/interior/driver-seat.webp", position: "50% 50%", alt: "Beige quilted leather driver seat" }],
      details: [{ src: "/images/experience/details/grille.webp", position: "50% 50%", alt: "Chrome grille with Trident badge" }],
      wheels: [{ src: "/images/experience/details/wheel-caliper.webp", position: "50% 50%", alt: "Alloy wheel with red brake caliper" }],
      engine: [{ src: "/images/experience/details/engine.webp", position: "50% 50%", alt: "Engine bay" }],
      rear: [{ src: "/images/experience/exterior/frame-05.webp", position: "50% 55%", alt: "Rear view with LED taillights" }],
    },
  },
  {
    id: "brabus-gls",
    story: {
      specs: [
        { big: "V8", label: "4.0 L biturbo · hand-finished engine" },
        { big: "800", unit: "HP", label: "1,000 Nm of torque" },
        { big: "4MATIC", label: "Permanent all-wheel drive" },
      ],
      final: ["Power.", "Without", "compromise."],
    },
    ambient: "200, 190, 175",
    video: { src: "/videos/brabus.mp4", poster: "/videos/brabus-poster.webp" },
    index: "02",
    brand: "Brabus",
    modelLines: ["GLS"],
    subtitle: "Performance Luxury SUV",
    tagline: ["Power.", "Without compromise."],
    description: ["The ultimate combination of luxury,", "performance and presence.", "A statement on every road."],
    detailIntro: "The ultimate combination of luxury, performance and presence. A statement on every road.",
    tags: ["Presence", "Power", "Comfort"],
    quickSpecs: ["V8", "800 HP", "4MATIC", "Luxury SUV"],
    specs: [
      { value: "4.0 L", label: "V8 Biturbo", icon: "engine" },
      { value: "Automatic", label: "Transmission", icon: "gearbox" },
      { value: "4MATIC", label: "Drivetrain", icon: "drive" },
      { value: "Luxury SUV", label: "Body type", icon: "body" },
      { value: "Germany", label: "Origin", icon: "origin" },
    ],
    hero: { src: "/images/vehicles/brabus/brabus-gls-showroom.webp", position: "55% 55%", alt: "Black Brabus GLS in a showroom" },
    showcase: { src: "/images/vehicles/brabus/brabus-gls-showroom.webp", position: "60% 55%", alt: "Black Brabus GLS" },
    thumbnail: { src: "/images/vehicles/brabus/brabus-gls-showroom.webp", position: "58% 60%", alt: "" },
    gallery: {
      exterior: [{ src: "/images/vehicles/brabus/brabus-gls-showroom.webp", position: "50% 60%", alt: "Brabus GLS, front three-quarter" }],
      rear: [{ src: "/images/services/brabus-rear.webp", position: "50% 50%", alt: "Brabus rear detail" }],
    },
  },
  {
    id: "porsche-911-turbo",
    story: {
      specs: [
        { big: "3.8", unit: "L", label: "Twin-turbo flat-six" },
        { big: "580", unit: "HP", label: "750 Nm of torque" },
        { big: "AWD", label: "Porsche Traction Management" },
      ],
      final: ["The art", "of driving."],
    },
    ambient: "190, 60, 50",
    video: { src: "/videos/porsche.mp4", poster: "/videos/porsche-poster.webp" },
    index: "03",
    brand: "Porsche",
    modelLines: ["911 Turbo", "Cabriolet"],
    subtitle: "The Art of Driving",
    tagline: ["The art of driving.", ""],
    description: ["Iconic performance.", "Timeless design.", "An open-air experience like no other."],
    detailIntro: "Iconic performance. Timeless design. An open-air experience like no other.",
    tags: ["Heritage", "Precision", "Freedom"],
    quickSpecs: ["3.8 L", "580 HP", "AWD", "Cabriolet"],
    specs: [
      { value: "3.8 L", label: "Flat-six twin turbo", icon: "engine" },
      { value: "PDK", label: "Transmission", icon: "gearbox" },
      { value: "AWD", label: "Drivetrain", icon: "drive" },
      { value: "Cabriolet", label: "Body type", icon: "body" },
      { value: "Germany", label: "Origin", icon: "origin" },
    ],
    hero: { src: "/images/vehicles/porsche/porsche-911-cabriolet.webp", position: "62% 60%", alt: "Black Porsche 911 Turbo Cabriolet with red roof" },
    showcase: { src: "/images/vehicles/porsche/porsche-911-cabriolet.webp", position: "65% 60%", alt: "Black Porsche 911 Turbo Cabriolet with red roof" },
    thumbnail: { src: "/images/vehicles/porsche/porsche-911-cabriolet.webp", position: "65% 62%", alt: "" },
    gallery: {
      exterior: [{ src: "/images/vehicles/porsche/porsche-911-cabriolet.webp", position: "50% 60%", alt: "Porsche 911 Turbo Cabriolet, front three-quarter" }],
      interior: [{ src: "/images/experience/interior/steering-wheel.webp", position: "50% 50%", alt: "Porsche steering wheel" }],
      rear: [
        { src: "/images/auction/porsche-rear.webp", position: "50% 50%", alt: "Porsche rear light bar" },
        { src: "/images/about/coastal-porsche.webp", position: "50% 70%", alt: "Porsche on a coastal road at dusk" },
      ],
    },
  },
];

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id);
export const vehicleName = (v: Vehicle) => `${v.brand} ${v.modelLines.join(" ")}`;
export const galleryOrder: GalleryCategory[] = ["exterior", "interior", "details", "wheels", "engine", "rear"];

/** Merge the locale's copy into a vehicle (structure, images and figures stay shared). */
export function localizeVehicle(v: Vehicle, dict: import("@/i18n/config").Dict): Vehicle {
  const c = dict.vehicles[v.id];
  if (!c) return v;
  const name = vehicleName(v);
  const unit = (u?: string) => (u ? dict.units[u] ?? u : u);
  return {
    ...v,
    subtitle: c.subtitle,
    tagline: [c.tagline[0], c.tagline[1] ?? ""],
    description: c.description,
    detailIntro: c.description.join(" "),
    tags: c.tags,
    quickSpecs: c.quickSpecs,
    specs: v.specs.map((s, i) => ({ ...s, value: c.specs[i]?.[0] ?? s.value, label: c.specs[i]?.[1] ?? s.label })),
    story: {
      specs: v.story.specs.map((s, i) => ({ ...s, unit: unit(s.unit), label: c.story.labels[i] ?? s.label })),
      final: c.story.final,
    },
    hero: { ...v.hero, alt: c.alt },
    showcase: { ...v.showcase, alt: c.alt },
    gallery: Object.fromEntries(
      Object.entries(v.gallery).map(([cat, imgs]) => [
        cat,
        imgs?.map((img) => ({ ...img, alt: `${name} — ${dict.detail.categories[cat as GalleryCategory]}` })),
      ]),
    ),
  };
}

export const localizeVehicles = (dict: import("@/i18n/config").Dict) => vehicles.map((v) => localizeVehicle(v, dict));
