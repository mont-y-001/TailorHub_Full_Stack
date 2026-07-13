export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
    default: "bg-surface-100 text-surface-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-accent-100 text-accent-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-primary-100 text-primary-700",
    available: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
}