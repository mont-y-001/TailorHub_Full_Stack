import { Link } from "react-router-dom";
import { Scissors, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Tailor<span className="text-primary-400">HUB</span>
              </span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed">
              Premium tailoring services at your fingertips. Connect with trusted
              local tailors for all your clothing needs.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-surface-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-surface-400">
              <li>Custom Tailoring</li>
              <li>Alterations</li>
              <li>Bridal Wear</li>
              <li>Kids Wear</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-surface-400">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
                Ghaziabad, India
              </li>
              <li className="flex items-center gap-2 text-surface-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-surface-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                support@tailorhub.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            © 2025 TailorHUB. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-surface-500">
            <Link to="/about" className="hover:text-surface-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-surface-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}