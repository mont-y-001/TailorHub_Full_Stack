import ProviderNavbar from "../components/ProviderNavbar";

export default function ProviderLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProviderNavbar />
      <main className="p-6">{children}</main>
    </div>
  );
}
