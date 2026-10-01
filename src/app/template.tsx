"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { easeLuxury } from "@/lib/motion";
import { getVehicle } from "@/data/vehicles";

// The first page load belongs to the intro; only client-side navigations get a transition.
type NavWindow = Window & { __vaultNavigated?: boolean };

const titles: Record<string, string> = {
  "/": "VAULT",
  "/collection": "Collection",
  "/experience": "360° Experience",
  "/about": "About VAULT",
  "/journal": "Journal",
  "/contact": "Private access",
  "/auction": "Private auction",
  "/sell": "Sell your automobile",
  "/privacy": "Privacy policy",
  "/terms": "Terms of service",
};

function titleFor(path: string) {
  const v = path.startsWith("/collection/") ? getVehicle(path.split("/")[2]) : undefined;
  if (v) return `${v.brand} ${v.modelLines.join(" ")}`;
  return titles[path] ?? "VAULT";
}

/**
 * Route transition: a dark curtain carrying the destination's name lifts off the new page.
 * Pure entrance animation on top of normal <Link> navigation, so back/forward,
 * modifier-clicks and prefetching keep their default behaviour.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [animateIn] = useState(() => typeof window !== "undefined" && !!(window as NavWindow).__vaultNavigated);
  useEffect(() => {
    (window as NavWindow).__vaultNavigated = true;
  }, []);

  return (
    <>
      {animateIn && (
        <motion.div
          className="route-curtain"
          aria-hidden="true"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", opacity: reduce ? 0 : 1 }}
          transition={{ duration: reduce ? 0.2 : 0.55, delay: reduce ? 0 : 0.18, ease: easeLuxury }}
        >
          <motion.span
            className="route-curtain-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, ease: easeLuxury }}
          />
          <motion.span
            className="route-curtain-title"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: easeLuxury }}
          >
            {titleFor(pathname)}
          </motion.span>
        </motion.div>
      )}
      {children}
    </>
  );
}
