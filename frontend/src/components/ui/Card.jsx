import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = true,
  onClick,
}) {
  const Component = onClick ? "button" : motion.div;
  const motionProps = onClick
    ? { onClick, type: "button" }
    : {
        whileHover: hover ? { y: -4 } : undefined,
        transition: { duration: 0.2, ease: "easeOut" },
      };

  return (
    <Component
      className={`
        bg-white rounded-2xl shadow-card
        ${hover && !onClick ? "hover:shadow-lift" : ""}
        ${onClick ? "cursor-pointer text-left w-full" : ""}
        ${padding ? "p-6" : ""}
        transition-shadow duration-200
        ${className}
      `}
      {...motionProps}
    >
      {children}
    </Component>
  );
}