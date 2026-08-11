import { cn } from "@/lib/utils";
import { Nut } from "lucide-react";

const LoadingScreen = ({
  absolute = true,
  topIndex = false,
  className,
}: {
  absolute?: boolean;
  topIndex?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-white",
        !!absolute && `absolute top-0 right-0`,
        !!topIndex && "z-10",
        className,
      )}
    >
      <Nut className="animate-bounce" />
      <h1 className="animate-bounce-slow font-nunito">Memuat Halaman</h1>
    </div>
  );
};

export default LoadingScreen;
