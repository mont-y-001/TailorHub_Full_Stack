import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      title: "Men’s Custom Stitching",
      desc: "Perfectly tailored shirts, suits, and traditional wear.",
      img: "https://images.pexels.com/photos/3738081/pexels-photo-3738081.jpeg",
    },
    {
      title: "Women’s Tailoring",
      desc: "Blouses, lehengas, dresses stitched to perfection.",
      img: "https://images.pexels.com/photos/3738075/pexels-photo-3738075.jpeg",
    },
    {
      title: "Alterations & Repairs",
      desc: "Resizing, hemming, zips, patchwork & repairs.",
      img: "https://images.pexels.com/photos/462084/pexels-photo-462084.jpeg",
    },
    {
      title: "Wedding & Party Wear",
      desc: "Premium outfits for special occasions.",
      img: "https://images.pexels.com/photos/3738086/pexels-photo-3738086.jpeg",
    },
    {
      title: "Kids Tailoring",
      desc: "Comfortable and stylish outfits for kids.",
      img: "https://images.pexels.com/photos/3738099/pexels-photo-3738099.jpeg",
    },
    {
      title: "Custom Design Requests",
      desc: "Bring your own design or let us create one.",
      img: "https://images.pexels.com/photos/3738093/pexels-photo-3738093.jpeg",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-yellow-400 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Our Services</h1>
        <p className="text-gray-800 mt-4 text-lg">
          Professional tailoring services — all in one place.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">
          Need a Tailor? Book an Appointment Now
        </h2>
        <p className="mt-2 text-gray-300">
          Fast, professional, and done your way.
        </p>

        <Link
          to="/appointment"
          className="mt-6 inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow hover:scale-105 transition"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
}
