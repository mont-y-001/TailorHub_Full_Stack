export default function ServiceCard({ title, desc, img }) {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition rounded-xl p-8">
      <img src={img} alt={title} className="rounded-lg mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
