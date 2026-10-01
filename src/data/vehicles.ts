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
};

export const vehicles: Vehicle[] = [
  {
    id: "maserati-quattroporte",
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
