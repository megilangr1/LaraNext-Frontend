import { Metadata } from "next";
import { StarterHero } from "./_components/home/starter-hero";
import { StarterMission } from "./_components/home/starter-mission";
import { StarterFeatures } from "./_components/home/starter-features";
import { StarterCapabilities } from "./_components/home/starter-capabilities";

export const metadata: Metadata = {
  title: "Starter | Fondasi Aplikasi Web Modern",
  description:
    "Starter - Template aplikasi web modern yang menggabungkan Next.js dan Laravel untuk mempercepat pengembangan produk digital yang terstruktur dan siap pakai.",
  keywords: [
    "Starter",
    "Next.js",
    "Laravel",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Full-stack",
    "Web Application",
    "Boilerplate",
    "Starter Template",
  ],
  authors: [{ name: "Starter Team" }],
  openGraph: {
    title: "Starter | Fondasi Aplikasi Web Modern",
    description:
      "Template aplikasi web modern yang menggabungkan Next.js dan Laravel untuk pengembangan yang cepat.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Starter | Fondasi Aplikasi Web Modern",
    description:
      "Template aplikasi web modern yang menggabungkan Next.js dan Laravel.",
    creator: "@starter_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
};

export default function Page() {
  return (
    <main className="relative w-full overflow-x-hidden pt-16">
      <StarterHero />
      <StarterMission />
      <StarterFeatures />
      <StarterCapabilities />
    </main>
  );
}
