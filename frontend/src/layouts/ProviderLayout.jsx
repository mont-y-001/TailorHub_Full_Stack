export default function ProviderLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-50">
      <main className="py-8 sm:py-10">{children}</main>
    </div>
  );
}