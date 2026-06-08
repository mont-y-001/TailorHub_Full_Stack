import { useEffect, useState, useCallback } from "react";
import ProviderLayout from "../../layouts/ProviderLayout";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* FETCH PROVIDER APPOINTMENTS */
  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/appointments/provider`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* UPDATE STATUS */
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      fetchAppointments(); // refresh list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <ProviderLayout>
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      {loading && <p>Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p className="text-gray-600">No appointments yet.</p>
      )}

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {appt.customer?.name}
              </h3>
              <p className="text-gray-600">📞 {appt.phone}</p>
              <p className="text-gray-600">🧵 {appt.service}</p>
              <p className="text-gray-600">📅 {appt.date}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span className="font-semibold">
                  {appt.status}
                </span>
              </p>
            </div>

            {/* ACTION BUTTONS */}
            {appt.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(appt._id, "approved")}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(appt._id, "rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ProviderLayout>
  );
}
