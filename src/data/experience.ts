/**
 * 360° experience media.
 *
 * `exterior.closed` is an ordered ring of views around the car (45° steps).
 * Dragging steps through the ring and wraps at both ends. To upgrade to a
 * smoother turntable, add more frames at equal angle intervals; no component
 * changes are needed.
 *
 * `doorsOpen` / `trunkOpen` hold the views for those states. An empty array
 * means the imagery does not exist yet and the control is disabled.
 */
export type Frame = { src: string; label: string; position?: string };

export type ExperienceSet = {
  exterior: { closed: Frame[]; doorsOpen: Frame[]; trunkOpen: Frame[] };
  interior: Frame[];
  details: Frame[];
};

const ext = (n: string) => `/images/experience/exterior/${n}.webp`;
const int = (n: string) => `/images/experience/interior/${n}.webp`;
const det = (n: string) => `/images/experience/details/${n}.webp`;

export const maseratiExperience: ExperienceSet = {
  exterior: {
    closed: [
      { src: ext("frame-02"), label: "Front left" },
      { src: ext("frame-03"), label: "Left profile" },
      { src: ext("frame-04"), label: "Rear left" },
      { src: ext("frame-05"), label: "Rear" },
      { src: ext("frame-06"), label: "Rear right" },
      { src: ext("frame-07"), label: "Right profile" },
      { src: ext("frame-08"), label: "Front right" },
      { src: ext("frame-01"), label: "Front" },
    ],
    doorsOpen: [{ src: ext("doors-open"), label: "Door open" }],
    trunkOpen: [{ src: ext("trunk-open"), label: "Trunk open" }],
  },
  interior: [
    { src: int("dashboard"), label: "Dashboard" },
    { src: int("driver-seat"), label: "Driver seat" },
    { src: int("steering-wheel"), label: "Steering wheel" },
    { src: int("front-cabin"), label: "Front cabin" },
    { src: int("rear-seats"), label: "Rear seats" },
  ],
  details: [
    { src: det("wheel-caliper"), label: "Forged wheel · red caliper" },
    { src: det("headlight"), label: "Adaptive LED headlight" },
    { src: det("grille"), label: "Trident grille" },
    { src: det("rear-light"), label: "Boomerang tail light" },
    { src: det("engine"), label: "Twin-turbo V6" },
    { src: det("trim"), label: "Illuminated sill" },
  ],
};
