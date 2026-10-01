"use client";

import Image from "next/image";
import { useRef } from "react";
import { Play, X } from "lucide-react";

type Props = {
  label?: string;
  title: string;
  poster: string;
  posterPosition?: string;
  className?: string;
};

/** Opens a modal film player. No film files exist yet, so it shows the poster with a "coming soon" state. */
export default function WatchVideo({ label = "Watch video", title, poster, posterPosition = "50% 50%", className = "" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className={`btn btn-ghost btn-play ${className}`.trim()} onClick={() => ref.current?.showModal()}>
        <span className="btn-icon btn-icon-lg">
          <Play size={13} strokeWidth={1.4} />
        </span>
        <span>{label}</span>
      </button>
      <dialog
        ref={ref}
        className="video-modal"
        aria-label={title}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="video-frame">
          <Image src={poster} alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectPosition: posterPosition }} />
          <div className="video-overlay">
            <span className="video-play" aria-hidden="true">
              <Play size={22} strokeWidth={1.3} />
            </span>
            <p className="eyebrow">{title}</p>
            <p className="video-note">Film coming soon. Request a private viewing to see the car in person.</p>
          </div>
          <button type="button" className="icon-circle video-close" aria-label="Close video" onClick={() => ref.current?.close()}>
            <X size={16} strokeWidth={1.3} />
          </button>
        </div>
      </dialog>
    </>
  );
}
