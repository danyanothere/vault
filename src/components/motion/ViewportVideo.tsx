"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Load immediately. Otherwise the source is attached when the video nears the viewport. */
  eager?: boolean;
  /** Extra gate: only plays while true (e.g. once a scroll story reaches its specs). */
  active?: boolean;
  /** Start from the first frame every time it becomes active (matches a still photo). */
  restart?: boolean;
  style?: React.CSSProperties;
};

/**
 * Muted, looping background video that only decodes while it is (nearly) on screen.
 * Keeps the number of simultaneously playing videos on a page to one or two.
 */
const ViewportVideo = forwardRef<HTMLVideoElement, Props>(function ViewportVideo(
  { src, poster, className, eager = false, active = true, restart = false, style },
  ref,
) {
  const el = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(eager);
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => el.current as HTMLVideoElement);

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setArmed(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = el.current;
    if (!v || !armed) return;
    if (visible && active) {
      if (restart) v.currentTime = 0;
      v.play().catch(() => {
        // autoplay can be refused (power saving); the still/poster stays visible
      });
    } else {
      v.pause();
    }
  }, [armed, visible, active, restart]);

  return (
    <video
      ref={el}
      className={className}
      style={style}
      src={armed ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
});

export default ViewportVideo;
