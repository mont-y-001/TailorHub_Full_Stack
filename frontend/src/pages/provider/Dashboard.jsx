import ProviderLayout from "../../layouts/ProviderLayout";

export default function Dashboard() {
  return (
    <ProviderLayout>
      <h1 className="text-3xl font-bold mb-4">Welcome, Provider 👋</h1>
      <p className="text-gray-600">
        Manage your services and appointments from here.
      </p>
    </ProviderLayout>
  );
}
