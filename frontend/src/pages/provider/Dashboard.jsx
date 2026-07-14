import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  IndianRupee,
  Users,
  Scissors,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ProviderLayout from "../../layouts/ProviderLayout";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/appointments/provider`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);

        const today = new Date().toDateString();
        
        // Fetch services to get prices for revenue calculation
        const servicesRes = await fetch(`${process.env.REACT_APP_API_URL}/api/services`);
        const servicesData = await servicesRes.json();
        const servicesMap = Array.isArray(servicesData) 
          ? servicesData.reduce((acc, s) => ({ ...acc, [s._id]: s.price }), {})
          : {};

        setStats({
          todayAppointments: data.filter(
            (a) => new Date(a.date).toDateString() === today
          ).length,
          pendingOrders: data.filter((a) => a.status === "pending" || a.status === "approved").length,
          completedOrders: data.filter((a) => a.status === "completed").length,
          revenue: data
            .filter((a) => a.status === "completed")
            .reduce((sum, a) => {
              const servicePrice = servicesMap[a.service] || 0;
              return sum + servicePrice;
            }, 0),
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh dashboard every 30 seconds to show real-time updates
    const interval = setInterval(fetchData, 30000);

    // Listen for appointment status changes to refresh immediately
    const handleStatusChange = () => {
      fetchData();
    };

    window.addEventListener('appointmentStatusChanged', handleStatusChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('appointmentStatusChanged', handleStatusChange);
    };
  }, []);

  const statCards = [
    {
      icon: CalendarCheck,
      label: "Today's Appointments",
      value: stats.todayAppointments,
      color: "primary",
    },
    {
      icon: Clock,
      label: "Pending Orders",
      value: stats.pendingOrders,
      color: "amber",
    },
    {
      icon: CheckCircle2,
      label: "Completed Orders",
      value: stats.completedOrders,
      color: "green",
    },
    {
      icon: IndianRupee,
      label: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      color: "teal",
    },
  ];

  const recentAppointments = appointments.slice(0, 5);

  return (
    <ProviderLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" {...fadeUp}>
          <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-500 mt-1">
            Welcome back! Here's your business overview.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
              }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Appointments */}
        <motion.div {...fadeUp}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-surface-900">
                Recent Appointments
              </h2>
              <p className="text-sm text-surface-500 mt-0.5">
                Latest booking activity
              </p>
            </div>
            <Badge variant="info">{appointments.length} total</Badge>
          </div>

          <Card padding={false}>
            {recentAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <CalendarCheck className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                <p className="text-surface-500 font-medium">No appointments yet</p>
                <p className="text-surface-400 text-sm mt-1">
                  New bookings will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-surface-100">
                {recentAppointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-surface-900 truncate">
                        {apt.customerName || "Customer"}
                      </p>
                      <p className="text-sm text-surface-500">
                        {apt.date ? new Date(apt.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) : ""}
                        {apt.timeSlot ? ` · ${apt.timeSlot}` : ""}
                      </p>
                    </div>
                    <Badge
                      variant={
                        apt.status === "completed"
                          ? "success"
                          : apt.status === "pending"
                          ? "warning"
                          : "info"
                      }
                    >
                      {apt.status || "pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="mt-10" {...fadeUp}>
          <h2 className="text-xl font-bold text-surface-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card onClick={() => window.location.href = "/provider/services"}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-primary-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-surface-900">Manage Services</p>
                  <p className="text-sm text-surface-500">Add or update services</p>
                </div>
                <ChevronRight className="w-5 h-5 text-surface-400" />
              </div>
            </Card>

            <Card onClick={() => window.location.href = "/provider/appointments"}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-accent-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-surface-900">View Appointments</p>
                  <p className="text-sm text-surface-500">Manage bookings</p>
                </div>
                <ChevronRight className="w-5 h-5 text-surface-400" />
              </div>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-surface-900">View Reviews</p>
                  <p className="text-sm text-surface-500">Customer feedback</p>
                </div>
                <ChevronRight className="w-5 h-5 text-surface-400" />
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </ProviderLayout>
  );
}