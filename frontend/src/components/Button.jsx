export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-yellow-400 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
    >
      {children}
    </button>
  );
}
