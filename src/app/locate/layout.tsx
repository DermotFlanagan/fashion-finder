import Navbar from "../components/ui/Navbar";

export default function LocateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar fixed={true} />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
