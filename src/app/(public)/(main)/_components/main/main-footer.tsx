import { AppWindowMac } from "lucide-react";
import Link from "next/link";

const MainFooter = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-6 md:px-12 text-sm text-neutral-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-neutral-400 font-bold tracking-wider italic text-xl">
          MeGGi<span className="text-red-500">.</span>
        </div>
        <div className="flex flex-col gap-2 items-end justify-center">
          © {new Date().getFullYear()} Starter. All rights reserved.
          <Link href={"/login"}>
            <AppWindowMac className="shrink-0 size-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
