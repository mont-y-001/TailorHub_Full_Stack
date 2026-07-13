import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, color = "primary", trend }) {
  const colors = {
    primary: "bg-primary-50 text-primary-500",
    teal: "bg-secondary-50 text-secondary-500",
    amber: "bg-accent-50 text-accent-500",
    green: "bg-green-50 text-green-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-card p-6 flex items-start gap-4"
    >
      <div className={`p-3 rounded-xl ${colors[color] || colors.primary}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-surface-500">{label}</p>
        <p className="text-2xl font-bold text-surface-900 mt-1">{value}</p>
        {trend && (
          <p className={`text-xs font-semibold mt-1 ${trend > 0 ? "text-green-600" : "text-red-500"}`}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </motion.div>
  );
}