import homeImg from "../assets/homeimg.jpeg";

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-yellow-400 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900">About TailorHUB</h1>
          <p className="text-gray-800 mt-4 text-lg">
            Your trusted platform for modern, reliable, and high-quality tailoring services.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600">
              TailorHUB connects customers with skilled local tailors for stitching,
              alterations, and custom designs — making tailoring simple and reliable.
            </p>
            <p className="text-gray-600 mt-4">
              From special occasions to everyday wear, we ensure quality and convenience.
            </p>
          </div>

          <img src={homeImg} alt="Tailor shop" className="rounded-xl shadow-lg" />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Why Choose TailorHUB?</h2>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <Card title="Experienced Tailors" />
            <Card title="Fast Turnaround" />
            <Card title="Doorstep Service" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ title }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">
        Professional quality with customer-first approach.
      </p>
    </div>
  );
}
