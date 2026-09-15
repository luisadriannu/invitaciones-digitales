"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: Props) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 1600);
  };

  return (
    <AnimatePresence>
      {!opened ? (
        <motion.div
          key="envelope-idle"
          exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.4, delay: 1.2 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #fdf1f5 0%, #f8dfe9 100%)" }}
          onClick={handleClick}
        >
          {/* Partículas de fondo */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                background: "rgba(217,140,174,0.35)",
                top: `${15 + i * 13}%`,
                left: `${10 + i * 14}%`,
              }}
            />
          ))}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Sobre */}
            <div className="relative" style={{ width: 260, height: 180 }}>
              {/* Cuerpo del sobre */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(160deg, #fff6f9 0%, #fde8f0 100%)",
                  border: "1px solid rgba(217,140,174,0.45)",
                  boxShadow: "0 20px 60px rgba(200,140,170,0.25), 0 4px 16px rgba(200,140,170,0.15)",
                }}
              />

              {/* Triángulo inferior (solapa de abajo) */}
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(160deg, #fde8f0 0%, #f8d5e6 100%)",
                  clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                  borderRadius: "0 0 16px 16px",
                }}
              />

              {/* Triángulos laterales */}
              <div
                className="absolute"
                style={{
                  top: 0, left: 0, bottom: 0,
                  width: "50%",
                  background: "linear-gradient(135deg, #fce4ef 0%, #f9d0e4 100%)",
                  clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: 0, right: 0, bottom: 0,
                  width: "50%",
                  background: "linear-gradient(225deg, #fce4ef 0%, #f9d0e4 100%)",
                  clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
                }}
              />

              {/* Solapa superior — estática (cerrada) */}
              <div
                className="absolute"
                style={{
                  top: 0, left: 0, right: 0,
                  height: "50%",
                  background: "linear-gradient(180deg, #fce4ef 0%, #f5c8dc 100%)",
                  clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                  borderRadius: "16px 16px 0 0",
                  zIndex: 10,
                }}
              />

              {/* Sello de lacre */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c98fa8, #d98cae)",
                  border: "2px solid rgba(255,246,249,0.8)",
                  boxShadow: "0 4px 16px rgba(201,143,168,0.5)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              >
                {/* Cruz */}
                <svg viewBox="0 0 24 32" width={14} height={18} fill="none" stroke="rgba(255,246,249,0.95)" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 4v24" />
                  <path d="M4 12h16" />
                </svg>
              </div>
            </div>

            {/* Texto */}
            <div className="flex flex-col items-center gap-2">
              <p
                className="italic font-light"
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#5a3a48",
                  letterSpacing: "0.02em",
                }}
              >
                Tienes una invitación
              </p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#c98fa8",
                }}
              >
                Toca para abrir
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="envelope-opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 1.2 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #fdf1f5 0%, #f8dfe9 100%)" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Sobre abriéndose */}
            <div className="relative" style={{ width: 260, height: 180 }}>
              {/* Cuerpo */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(160deg, #fff6f9 0%, #fde8f0 100%)",
                  border: "1px solid rgba(217,140,174,0.45)",
                  boxShadow: "0 20px 60px rgba(200,140,170,0.25)",
                }}
              />
              <div
                className="absolute"
                style={{
                  bottom: 0, left: 0, right: 0,
                  height: "50%",
                  background: "linear-gradient(160deg, #fde8f0 0%, #f8d5e6 100%)",
                  clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                  borderRadius: "0 0 16px 16px",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: 0, left: 0, bottom: 0, width: "50%",
                  background: "linear-gradient(135deg, #fce4ef 0%, #f9d0e4 100%)",
                  clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: 0, right: 0, bottom: 0, width: "50%",
                  background: "linear-gradient(225deg, #fce4ef 0%, #f9d0e4 100%)",
                  clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
                }}
              />

              {/* Solapa abriéndose */}
              <motion.div
                initial={{ rotateX: 0, transformOrigin: "top center" }}
                animate={{ rotateX: -180 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "50%",
                  background: "linear-gradient(180deg, #fce4ef 0%, #f5c8dc 100%)",
                  clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                  borderRadius: "16px 16px 0 0",
                  zIndex: 10,
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                }}
              />

              {/* Tarjeta saliendo */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -90, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="absolute left-1/2 rounded-xl flex items-center justify-center"
                style={{
                  width: 180,
                  height: 110,
                  transform: "translateX(-50%)",
                  background: "linear-gradient(160deg, #fff6f9 0%, #fde8f0 100%)",
                  border: "1px solid rgba(217,140,174,0.5)",
                  boxShadow: "0 8px 30px rgba(200,140,170,0.3)",
                  zIndex: 5,
                  bottom: 10,
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <svg viewBox="0 0 64 40" width={28} height={18} fill="none" stroke="rgba(201,143,168,0.7)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M32 26c-3-8-10-13-19-13 5 3 7 7 7 11-6-1-11 1-15 5 6 1 11 0 15-3 1 6 6 10 12 11" />
                    <path d="M32 26c3-8 10-13 19-13-5 3-7 7-7 11 6-1 11 1 15 5-6 1-11 0-15-3-1 6-6 10-12 11" />
                    <circle cx="32" cy="21" r="2.1" fill="rgba(201,143,168,0.7)" stroke="none" />
                  </svg>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.75rem", color: "#c98fa8", fontStyle: "italic" }}>
                    Bautizo
                  </p>
                </div>
              </motion.div>

              {/* Sello */}
              <motion.div
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="absolute flex items-center justify-center"
                style={{
                  width: 44, height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c98fa8, #d98cae)",
                  border: "2px solid rgba(255,246,249,0.8)",
                  boxShadow: "0 4px 16px rgba(201,143,168,0.5)",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              >
                <svg viewBox="0 0 24 32" width={14} height={18} fill="none" stroke="rgba(255,246,249,0.95)" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 4v24" />
                  <path d="M4 12h16" />
                </svg>
              </motion.div>
            </div>

            <p
              className="italic font-light"
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "1.3rem",
                color: "#5a3a48",
              }}
            >
              Abriendo tu invitación…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
