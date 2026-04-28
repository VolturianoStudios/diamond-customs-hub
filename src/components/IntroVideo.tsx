import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://bfmqeuczlipocjqtzawj.supabase.co/storage/v1/object/public/VideoBackgroundsLandingpages/Open_gate_drone_flight_garage_202604281941.mp4";

const SESSION_KEY = "dc-intro-played";

export const IntroVideo = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  });
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!show) return;
    // Lock scroll while intro plays
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    // Try to play (muted autoplay is allowed in browsers)
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => finish());
    }
  }, [show]);

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setFadeOut(true);
    window.setTimeout(() => setShow(false), 900);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={fadeOut}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 right-6 rounded-full bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20"
      >
        Skip
      </button>
    </div>
  );
};

export default IntroVideo;
