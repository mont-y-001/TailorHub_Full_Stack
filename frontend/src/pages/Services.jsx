import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scissors, Star, MapPin, Clock, Search, Filter } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const categories = [
  "All",
  "Shirt Stitching",
  "Pant Alteration",
  "Bridal Wear",
  "Kids Wear",
  "Custom Tailoring",
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/services`
        );
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let result = services;

    if (activeCategory !== "All") {
      result = result.filter((s) =>
        s.title?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    if (search) {
      result = result.filter(
        (s) =>
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [activeCategory, search, services]);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="info" className="mb-4 bg-white/20 text-white border-0">
              Our Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Professional Tailoring Services
            </h1>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              Browse our wide range of services offered by expert tailors
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-primary-500 text-white shadow-soft"
                      : "bg-white text-surface-600 border border-surface-200 hover:border-primary-300 hover:text-primary-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Scissors className="w-16 h-16 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500 font-medium text-lg">
                No services found
              </p>
              <p className="text-surface-400 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                animate: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {filtered.map((service) => (
                <motion.div
                  key={service._id}
                  variants={{
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="h-full group">
                    {service.image && (
                      <div className="relative mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-2xl">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-surface-900">
                          {service.title}
                        </h3>
                        <p className="text-sm text-surface-500 mt-1 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                        <span className="text-sm font-semibold text-surface-700">
                          4.9
                        </span>
                        <span className="text-xs text-surface-400">
                          (24 reviews)
                        </span>
                      </div>
                      <p className="text-lg font-bold text-primary-500">
                        ₹{service.price}
                      </p>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={() =>
                        (window.location.href = `/appointment?service=${service._id}`)
                      }
                    >
                      Book Now
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}