export default function TeamCard({ name, role, img, link }) {
  return (
    <a
      href={link || "#"}
      target="_blank"
      rel="noreferrer"
      className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center"
    >
      <img
        src={img}
        alt={name}
        className="mx-auto rounded-full h-44 w-44 object-cover"
      />
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-500 uppercase text-sm">{role}</p>
    </a>
  );
}
