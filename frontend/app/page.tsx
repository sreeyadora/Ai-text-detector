"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Brain,
  BarChart3,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ================= PAGE ================= */

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700" />

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-purple-400/40 blur-[200px] -z-30" />
      <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-blue-400/40 blur-[200px] -z-30" />
      <div className="absolute bottom-0 left-1/4 h-[36rem] w-[36rem] rounded-full bg-indigo-400/30 blur-[220px] -z-30" />

      {/* Particles */}
      <Particles />

      {/* ===== HERO ===== */}
      <section className="relative z-10 flex min-h-screen items-center px-8 md:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-16 md:grid-cols-2">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm backdrop-blur">
              <Sparkles size={16} />
              Powered by Hybrid AI Models
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="h-12 w-12 text-white" />
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                OriginAI
              </h1>
            </div>

            <p className="max-w-md text-lg md:text-xl text-white/90">
              Know the true origin of every text
            </p>

            <div className="flex gap-4 pt-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-white px-9 py-4 text-lg font-bold text-indigo-700 shadow-[0_30px_90px_rgba(0,0,0,0.55)] ring-2 ring-white transition hover:scale-105"
              >
                Try It Now
              </Link>

              {/* 🔧 FIX: Login redirects to Dashboard */}
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/70 px-9 py-4 text-lg font-semibold backdrop-blur hover:bg-white/15 transition"
              >
                Login
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-6">
              <MiniFeature icon={<ShieldCheck size={18} />} text="Human vs AI" />
              <MiniFeature icon={<BarChart3 size={18} />} text="Confidence Scores" />
              <MiniFeature icon={<Zap size={18} />} text="Instant Results" />
            </div>
          </motion.div>

          {/* RIGHT ROBOT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center md:justify-end"
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 rounded-full blur-2xl bg-cyan-300/30"
              />

              <Image
                src="/robot.png"
                alt="OriginAI Robot"
                width={460}
                height={460}
                priority
                className="relative drop-shadow-[0_50px_140px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 bg-black/45 backdrop-blur-xl py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center text-3xl md:text-4xl font-bold">
            Why OriginAI?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Brain />}
              title="Hybrid AI Detection"
              text="Stylometric + ML models for robust analysis."
            />
            <FeatureCard
              icon={<BarChart3 />}
              title="Transparent Confidence"
              text="Clear probability scores for every prediction."
            />
            <FeatureCard
              icon={<Zap />}
              title="Fast & Simple"
              text="Paste text and get insights instantly."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= PARTICLES ================= */

function Particles() {
  const [particles, setParticles] = useState<
    { top: string; left: string; delay: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40 animate-pulse"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function MiniFeature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur shadow">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white/15 p-8 shadow-2xl backdrop-blur-lg transition hover:-translate-y-2 hover:bg-white/25">
      <div className="mb-4 text-blue-300">{icon}</div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-white/85">{text}</p>
    </div>
  );
}
