"use client";

import { motion } from "motion/react";
import { LayoutTemplate, Server, Component, Lock } from "lucide-react";

interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
}

const features: FeatureItem[] = [
  {
    title: "Frontend Modern",
    subtitle: "Next.js + React 19",
    description:
      "Bangun antarmuka yang cepat dan responsif dengan App Router, Server Components, dan Tailwind CSS v4 yang sudah terkonfigurasi.",
    icon: <LayoutTemplate className="w-12 h-12" />,
    accentColor: "text-blue-600",
  },
  {
    title: "Backend Terpadu",
    subtitle: "Laravel API",
    description:
      "API Laravel yang tangguh dengan pola CRUD, validasi, dan otorisasi yang konsisten untuk mendukung seluruh fitur aplikasi.",
    icon: <Server className="w-12 h-12" />,
    accentColor: "text-emerald-600",
  },
  {
    title: "Komponen UI Siap Pakai",
    subtitle: "Reusable Components",
    description:
      "Kumpulan komponen antarmuka yang dapat dipakai ulang untuk membangun form, tabel, dialog, dan navigasi dengan cepat.",
    icon: <Component className="w-12 h-12" />,
    accentColor: "text-cyan-600",
  },
  {
    title: "Autentikasi Bawaan",
    subtitle: "Sanctum Ready",
    description:
      "Sistem login, sesi, dan manajemen peran sudah tersedia sehingga Anda dapat fokus pada fitur bisnis aplikasi.",
    icon: <Lock className="w-12 h-12" />,
    accentColor: "text-purple-600",
  },
];

export function StarterFeatures() {
  return (
    <section className="bg-zinc-50 py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 w-full h-100 bg-linear-to-br from-blue-100 to-emerald-100 rounded-2xl overflow-hidden relative flex items-center justify-center">
              <div className={`${feature.accentColor} opacity-20`}>
                {feature.icon}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <span
                className={`block font-semibold tracking-wider uppercase text-sm ${feature.accentColor}`}
              >
                {feature.subtitle}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-lg text-zinc-600 leading-relaxed max-w-lg">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
