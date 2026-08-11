"use client";

import { motion } from "motion/react";
import {
  LayoutTemplate,
  Server,
  ShieldCheck,
  Database,
  Palette,
  Lock,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl transition-all hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-900/20 group-hover:scale-110 group-hover:shadow-blue-900/30 transition-all duration-500">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        
        <p className="text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function StarterMission() {
  return (
    <section className="py-32 px-6 bg-zinc-950 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">
              Tentang Starter
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
          >
            Misi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Visi</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed"
          >
            Starter hadir sebagai fondasi aplikasi web modern yang siap pakai,
            menggabungkan frontend Next.js dan backend Laravel untuk
            mempercepat pengembangan berbagai jenis produk digital yang
            terstruktur dan mudah dikembangkan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<LayoutTemplate className="w-8 h-8" />}
            title="Frontend Modern"
            description="Next.js 16 dengan React 19, TypeScript, dan Tailwind CSS v4 untuk pengalaman pengguna yang cepat dan modern."
            delay={0.3}
          />
          
          <FeatureCard
            icon={<Server className="w-8 h-8" />}
            title="Backend Terpadu"
            description="Laravel sebagai API yang tangguh dengan struktur CRUD siap pakai untuk mengelola data dengan rapi."
            delay={0.4}
          />
          
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Autentikasi & Otorisasi"
            description="Sistem login berbasis token (Sanctum) lengkap dengan manajemen peran dan hak akses."
            delay={0.5}
          />
          
          <FeatureCard
            icon={<Database className="w-8 h-8" />}
            title="Manajemen Data"
            description="Pola CRUD yang konsisten dan reusable untuk mempercepat pembuatan modul data baru."
            delay={0.6}
          />
          
          <FeatureCard
            icon={<Palette className="w-8 h-8" />}
            title="Komponen UI Siap Pakai"
            description="Kumpulan komponen antarmuka yang dapat dipakai ulang untuk membangun tampilan dengan cepat."
            delay={0.7}
          />
          
          <FeatureCard
            icon={<Lock className="w-8 h-8" />}
            title="Keamanan Data"
            description="Menjaga keamanan dan privasi data dengan standar keamanan yang tinggi sejak dari awal."
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
