import { getGreeting } from "@/lib/utils/date";
import { GreetingAnimated } from "./client/greeting-animated";

interface WelcomeHeaderProps {
  userName?: string;
}

export function WelcomeHeader({ userName = "Admin" }: WelcomeHeaderProps) {
  const greeting = getGreeting();
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-4 space-y-3">
      {/* Animated greeting */}
      <GreetingAnimated greeting={greeting} userName={userName} />

      {/* Date and status */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <p>{currentDate} • Selamat kembali ke dashboard Anda</p>
      </div>
    </div>
  );
}
