"use client";

import Image from "next/image";
import { useRef } from "react";
import { Play, X } from "lucide-react";

type Props = {
  label?: string;
  title: string;
  poster: string;
  posterPosition?: string;
  /** mp4 file in /public/videos. Without it the modal shows a "coming soon" poster. */
  src?: string;
  className?: string;
};

export default function WatchVideo({ label = "Watch video", title, poster, posterPosition = "50% 50%", src, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialog.current?.showModal();
    if (video.current) {
      video.current.currentTime = 0;
      video.current.play().catch(() => {
        // autoplay can be blocked; the controls stay available
      });
    }
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" data-cursor="play" className={`btn btn-ghost btn-play ${className}`.trim()} onClick={open}>
        <span className="btn-icon btn-icon-lg">
          {/* optically centred triangle (centroid on the circle's centre) */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
            <path d="M8.5 5.5v13L19 12z" />
          </svg>
        </span>
        <span>{label}</span>
      </button>
      <dialog
        ref={dialog}
        className="video-modal"
        aria-label={title}
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="video-frame">
          {src ? (
            <video ref={video} src={src} poster={poster} controls muted playsInline loop preload="none" />
          ) : (
            <>
              <Image src={poster} alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectPosition: posterPosition }} />
              <div className="video-overlay">
                <span className="video-play" aria-hidden="true">
                  <Play size={22} strokeWidth={1.3} />
                </span>
                <p className="eyebrow">{title}</p>
                <p className="video-note">Film coming soon. Request a private viewing to see the car in person.</p>
              </div>
            </>
          )}
          <button type="button" className="icon-circle video-close" aria-label="Close video" onClick={close}>
            <X size={16} strokeWidth={1.3} />
          </button>
        </div>
      </dialog>
    </>
  );
}
