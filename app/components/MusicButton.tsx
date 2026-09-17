"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Music2, Pause } from "lucide-react";
import styles from "./MusicButton.module.css";

interface Props {
  src: string;
  autoPlay?: boolean;
  color?: string;
  backgroundColor?: string;
}

export default function MusicButton({ src, autoPlay, color = "#826534", backgroundColor = "#faf5e9" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.src = src;

    audio.loop = true;

    audioRef.current = audio;

    const removeInteractionListeners = () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
    };
    const startOnInteraction = (event: Event) => {
      if (event.target instanceof Node && buttonRef.current?.contains(event.target)) return;
      void audio.play().catch(() => {});
    };
    const onPlay = () => {
      setPlaying(true);
      removeInteractionListeners();
    };
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    if (autoPlay) {
      document.addEventListener("click", startOnInteraction);
      document.addEventListener("keydown", startOnInteraction);
      void audio.play().catch(() => {});
    }

    return () => {
      removeInteractionListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [src, autoPlay]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }

    } catch (error) {
      console.error("Error reproduciendo audio:", error);
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleMusic}
      className={styles.button}
      style={{
        "--music-color": color,
        "--music-background": backgroundColor,
      } as CSSProperties}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      title={playing ? "Pausar música" : "Reproducir música"}
    >
      {playing
        ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" />
        : <Music2 size={19} strokeWidth={1.5} aria-hidden="true" />}
    </button>
  );
}
