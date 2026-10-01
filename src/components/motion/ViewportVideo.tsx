"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Load immediately (hero). Otherwise the source is attached when the video nears the viewport. */
  eager?: boolean;
  style?: React.CSSProperties;
};

/**
 * Muted, looping background video that only decodes while it is (nearly) on screen.
 * Keeps the number of simultaneously playing videos on a page to one or two.
 */
const ViewportVideo = forwardRef<HTMLVideoElement, Props>(function ViewportVideo({ src, poster, className, eager = false, style }, ref) {
  const el = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(eager);
  useImperativeHandle(ref, () => el.current as HTMLVideoElement);

  useEffect(() => {
    const v = el.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          v.play().catch(() => {
            // autoplay can be refused (power saving); poster stays visible
          });
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

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
      autoPlay={eager}
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
});

export default ViewportVideo;
