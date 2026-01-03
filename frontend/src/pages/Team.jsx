import TeamCard from "../components/TeamCard";

export default function Team() {
  const teamMembers = [
    {
      name: "Mohit Yadav",
      role: "Frontend Developer",
      img: "/team/mohit.jpg",
      link: "https://your-portfolio-link.com",
    },
    {
      name: "Nitin Saini",
      role: "UI/UX Designer",
      img: "/team/nitin.jpg",
      link: "https://your-portfolio-link.com",
    },
    {
      name: "Radwa",
      role: "Database Administration",
      img: "/team/radwa.jpg",
    },
    {
      name: "Prashant",
      role: "Backend Developer",
      img: "/team/prashant.jpg",
    },
    {
      name: "Mansha Sharma",
      role: "Testing",
      img: "/team/mansha.jpg",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <section className="bg-yellow-400 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Meet Our Team</h1>
        <p className="text-gray-800 text-lg mt-3">
          Passionate individuals driving TailorHUB forward.
        </p>
      </section>

      {/* TEAM GRID */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
