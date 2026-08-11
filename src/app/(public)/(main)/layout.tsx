import MainFooter from "./_components/main/main-footer";
import MainNav from "./_components/main/main-nav";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <MainNav />
      <div className="flex-1 flex flex-col gap-0">{children}</div>
      <MainFooter />
    </div>
  );
}
