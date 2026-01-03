export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold text-white">
            ✂️ TailorHUB
          </h3>
          <p className="text-gray-400 mt-3">
            Premium tailoring services at your fingertips.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p>📍 Ghaziabad, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@tailorhub.com</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © 2025 TailorHUB. All Rights Reserved.
      </div>
    </footer>
  );
}
