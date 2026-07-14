import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      alert("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Get in Touch
            </h1>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div className="space-y-6" {...fadeUp}>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">Phone</h3>
                    <p className="text-sm text-surface-500 mt-1">+91 98765 43210</p>
                    <p className="text-xs text-surface-400 mt-1">Mon-Sat, 9am-6pm</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">Email</h3>
                    <p className="text-sm text-surface-500 mt-1">support@tailorhub.com</p>
                    <p className="text-xs text-surface-400 mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">Location</h3>
                    <p className="text-sm text-surface-500 mt-1">Ghaziabad, India</p>
                    <p className="text-xs text-surface-400 mt-1">Serving all over India</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="lg:col-span-2" {...fadeUp}>
              <Card>
                <h2 className="text-2xl font-bold text-surface-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-800 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows="6"
                      placeholder="Tell us how we can help..."
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none"
                    />
                  </div>
                  <Button type="submit" loading={loading} size="lg" className="w-full sm:w-auto">
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}