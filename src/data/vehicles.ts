export type Vehicle = {
  slug: string;
  index: string;
  make: string;
  model: string;
  modelLines: string[];
  category: string;
  tagline: string[];
  description: string;
  pillars: string[];
  specs: string[];
  image: string;
  thumb: string;
  position: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "maserati-quattroporte",
    index: "01",
    make: "Maserati",
    model: "Quattroporte",
    modelLines: ["Quattroporte"],
    category: "Italian Grand Touring",
    tagline: ["The Italian", "grand tourer."],
    description:
      "Four doors, a Ferrari-derived heart and effortless long-distance pace. Elegance without announcement.",
    pillars: ["Luxury", "Performance", "Elegance"],
    specs: ["3.0 L", "V6", "RWD / AWD", "Luxury sedan"],
    image: "/images/hero-sedan.jpg",
    thumb: "/images/sedan-road.jpg",
    position: "62% 60%",
  },
  {
    slug: "brabus-gls",
    index: "02",
    make: "Brabus",
    model: "GLS",
    modelLines: ["GLS"],
    category: "Performance Luxury SUV",
    tagline: ["Power.", "Without compromise."],
    description:
      "The ultimate combination of luxury, performance and presence. A statement on every road.",
    pillars: ["Presence", "Power", "Comfort"],
    specs: ["V8", "800 HP", "4MATIC", "Luxury SUV"],
    image: "/images/suv.jpg",
    thumb: "/images/suv.jpg",
    position: "50% 55%",
  },
  {
    slug: "porsche-911-turbo",
    index: "03",
    make: "Porsche",
    model: "911 Turbo",
    modelLines: ["911 Turbo", "Cabriolet"],
    category: "Open-Air Performance",
    tagline: ["The art of", "driving."],
    description:
      "Iconic performance. Timeless design. An open-air experience like no other.",
    pillars: ["Heritage", "Precision", "Freedom"],
    specs: ["3.8 L", "580 HP", "AWD", "Cabriolet"],
    image: "/images/porsche.jpg",
    thumb: "/images/porsche.jpg",
    position: "50% 62%",
  },
];

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
