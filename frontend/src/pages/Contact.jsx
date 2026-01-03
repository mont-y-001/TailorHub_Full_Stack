export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <form className="grid gap-4">
        <input className="border p-3 rounded" placeholder="Name" />
        <input className="border p-3 rounded" placeholder="Email" />
        <textarea className="border p-3 rounded" placeholder="Message" />
        <button className="bg-yellow-400 px-6 py-3 rounded-full">
          Send Message
        </button>
      </form>
    </section>
  );
}
