"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { easeLuxury } from "@/lib/motion";
import { getVehicle } from "@/data/vehicles";
import { useDict } from "@/i18n/client";
import { stripLocale } from "@/i18n/config";

// The first page load belongs to the intro; only client-side navigations get a transition.
type NavWindow = Window & { __vaultNavigated?: boolean };

function titleFor(path: string, titles: Record<string, string>) {
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
  const pathname = stripLocale(usePathname());
  const titles = useDict().routes;
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
          initial={{ y: "0%", opacity: 1 }}
          animate={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.2 : 0.45, delay: reduce ? 0 : 0.2, ease: easeLuxury }}
        >
          <motion.span
            className="route-curtain-title"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: easeLuxury }}
          >
            {titleFor(pathname, titles)}
          </motion.span>
          {/* lime edge that travels with the lifting curtain */}
          <motion.span
            className="route-curtain-edge"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: easeLuxury }}
          />
        </motion.div>
      )}
      {children}
    </>
  );
}
