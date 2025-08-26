import Navbar from "../components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar fixed={false} />
      <main className="flex-1 flex items-center justify-center px-10 py-5">
        {children}
      </main>
    </div>
  );
}
