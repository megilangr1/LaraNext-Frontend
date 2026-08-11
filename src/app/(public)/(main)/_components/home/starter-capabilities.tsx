"use client";

import { motion } from "motion/react";
import { Database, ShieldCheck, Component, Lock } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const capabilities: Capability[] = [
  {
    title: "Manajemen Data",
    description: "Pola CRUD siap pakai untuk membuat dan mengelola modul data dengan cepat",
    icon: <Database className="w-8 h-8" />,
    features: ["Index & Detail", "Create & Edit", "Delete Dialog", "Pagination"],
  },
  {
    title: "Autentikasi & Otorisasi",
    description: "Login berbasis token dengan manajemen peran yang konsisten",
    icon: <ShieldCheck className="w-8 h-8" />,
    features: ["Sanctum Auth", "Role Based", "Session Guard", "Middleware"],
  },
  {
    title: "Komponen UI",
    description: "Kumpulan komponen antarmuka berbasis Tailwind dan Radix",
    icon: <Component className="w-8 h-8" />,
    features: ["Form Fields", "Data Table", "Dialog & Sheet", "Dark Mode"],
  },
  {
    title: "Keamanan Data",
    description: "Perlindungan data dengan standar keamanan yang baik",
    icon: <Lock className="w-8 h-8" />,
    features: ["Encryption", "Access Control", "Validation", "Audit Logs"],
  },
];

export function StarterCapabilities() {
  return (
    <section className="py-24 bg-black border-t border-white/5 overflow-x-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase mb-4">
              Kemampuan Platform
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter text-white">
              Starter <span className="text-emerald-500">Terpercaya</span>
            </h2>
          </div>
          <button className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/20 pb-2 hover:border-blue-600 hover:text-blue-500 transition-all text-white">
            Selengkapnya
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#0a0a0a] border border-white/5 p-6 transition-all hover:border-blue-500/30"
            >
              <div className="mb-6 text-blue-600 group-hover:text-emerald-500 transition-colors">
                {capability.icon}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-wide text-white group-hover:text-blue-600 transition-colors">
                  {capability.title}
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {capability.description}
                </p>
                <div className="pt-4 space-y-1">
                  {capability.features.map((feature, i) => (
                    <div key={i} className="text-xs text-white/40 flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-600 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
