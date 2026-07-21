"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  autoPlay?: boolean;
}

export default function MusicButton({ src, autoPlay }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);

    audio.loop = true;

    audioRef.current = audio;

    if (autoPlay) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [src, autoPlay]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }

      setPlaying((prev) => !prev);
    } catch (error) {
      console.error("Error reproduciendo audio:", error);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="
        fixed bottom-6 right-6 z-60
        w-10 h-10 rounded-full
        flex items-center justify-center
        bg-black/70 backdrop-blur
        border border-white/20
        shadow-lg
        hover:scale-110
        transition
        cursor-pointer
      "
      aria-label="Control de música"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>

      {!playing && (
        <span
          className="
            absolute
            w-10
            h-0.5
            bg-red-500
            rotate-45
          "
        />
      )}
    </button>
  );
}
