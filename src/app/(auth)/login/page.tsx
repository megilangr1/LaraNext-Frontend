import Image from "next/image";
import LoginForm from "./_components/login-form";
import Link from "next/link";
import AuthInit from "@/modules/auth/components/auth-init";
import { MainLogo } from "@/shared/components/main-logo";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-col flex-1 items-center justify-center">
            <Link href={"/"} className="flex items-center gap-2 font-medium">
              <MainLogo
                size="lg"
                alt={process.env.NEXT_PUBLIC_APP_NAME ?? "Starter"}
                className="scale-100 mt-1"
                priority={true}
                loading="eager"
              />
            </Link>

            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/main-3.jpg"
            alt="Image"
            width={2536}
            height={3804}
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            loading="eager"
            priority={false}
          />
        </div>

        <AuthInit />
      </div>
  );
}
