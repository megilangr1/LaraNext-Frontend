import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "custom";

interface MainLogoProps {
  size?: LogoSize;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

// Size presets for consistent sizing across the app
const SIZE_PRESETS = {
  xs: { width: 32, height: 32 },
  sm: { width: 48, height: 48 },
  md: { width: 60, height: 60 },
  lg: { width: 120, height: 120 },
} as const;

/**
 * MainLogo - Reusable MeGGi logo component with preset sizes
 *
 * Usage:
 * - <MainLogo size="sm" /> - 32x32
 * - <MainLogo size="md" /> - 60x60
 * - <MainLogo size="lg" /> - 120x120
 * - <MainLogo size="custom" width={100} height={100} /> - custom size
 */
export function MainLogo({
  size = "md",
  width,
  height,
  alt = "MeGGi",
  className,
  priority = false,
  loading = "lazy",
}: MainLogoProps) {
  // Get dimensions from preset or custom
  const dimensions =
    size === "custom"
      ? { width: width || 60, height: height || 60 }
      : SIZE_PRESETS[size];

  return (
    <Image
      src="/logo-clear.png"
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={cn("h-auto w-auto", className)}
      priority={priority}
      loading={loading}
    />
  );
}
