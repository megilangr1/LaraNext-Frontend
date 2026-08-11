import Link from "next/link";
import { MainLogo } from "@/shared/components/main-logo";

const MainNav = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-blue-600/20 bg-linear-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl text-white">
      <div className="container mx-auto flex items-center justify-between px-6 sm:px-8 py-3">
        <div className="flex items-center gap-2">
          <Link href="/">
            <MainLogo
              size="sm"
              alt={process.env.NEXT_PUBLIC_APP_NAME ?? "Starter"}
              className="scale-100"
              priority={true}
              loading="eager"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
