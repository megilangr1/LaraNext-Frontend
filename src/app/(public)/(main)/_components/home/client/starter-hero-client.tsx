"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Particles } from "@/components/ui/particles";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function StarterHeroClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);
  return (
    <div className="relative w-full min-h-[90vh] overflow-hidden bg-white flex items-center justify-center">
      {/* Background Layer - Particles */}
      {mounted && (
        <>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color="#2563EB"
            refresh
          />
          <Particles
            className="absolute inset-0 z-0"
            quantity={50}
            ease={80}
            color="#059669"
            refresh
          />
        </>
      )}

      {/* Background Layer - Grid Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <AnimatedGridPattern
          width={30}
          height={30}
          numSquares={30}
          maxOpacity={0.3}
          duration={3}
          className={cn(
            "absolute inset-0 opacity-80 skew-y-12",
            "mask-[radial-gradient(400px_circle_at_center,white,transparent)] md:mask-[radial-gradient(700px_circle_at_center,white,transparent)]",
          )}
        />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-4 w-full">
        <BlurFade delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase shadow-sm">
            Starter Template
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <h1 className="mb-6 text-5xl sm:text-7xl md:text-8xl font-black text-zinc-900 uppercase leading-none tracking-tight">
            <AuroraText colors={["#2563eb", "#059669", "#0891b2", "#000000"]}>
              Starter
            </AuroraText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="mx-auto mb-10 max-w-2xl text-zinc-600 text-sm sm:text-base md:text-lg font-medium tracking-tight">
            Fondasi aplikasi web modern yang menggabungkan Next.js dan Laravel
            untuk membangun produk digital dengan cepat dan terstruktur.
            <br />
            <span className="text-blue-600 font-bold">Arsitektur siap pakai</span>{" "}
            untuk informasi yang lebih baik.
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <RainbowButton
              asChild
              size="lg"
              className="font-bold tracking-[0.2em] uppercase text-white"
            >
              <Link href="/login">
                🚀 Mulai Sekarang
              </Link>
            </RainbowButton>
            <RainbowButton
              variant="outline"
              size="lg"
              className="font-bold tracking-[0.2em] uppercase"
            >
              Pelajari Lebih Lanjut
            </RainbowButton>
          </div>
        </BlurFade>
      </div>

      {/* Vertical Text - Side */}
      <div className="absolute bottom-0 md:bottom-40 left-2 md:left-10 block overflow-hidden z-1">
        <p className="text-[10px] font-bold tracking-[0.8em] text-black/30 uppercase [writing-mode:horizontal-lr] md:[writing-mode:vertical-lr]">
          STARTER // NEXT.JS + LARAVEL
        </p>
      </div>
    </div>
  );
}
