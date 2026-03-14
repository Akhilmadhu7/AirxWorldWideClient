import Cards from "./Cards";
const SERVICES = [
  {
    icon: "📦",
    title: "Domestic Courier",
    description: "Door-to-door coverage across 24,000+ pin codes in India with guaranteed delivery timelines.",
  },
  {
    icon: "✈️",
    title: "International Courier",
    description: "Connect to 220+ countries with real-time tracking and customs clearance support.",
  },
  {
    icon: "🚢",
    title: "Bulk Shipping",
    description: "High-volume solutions for e-commerce & manufacturers with dedicated account management.",
  },
  {
    icon: "🏭",
    title: "Warehouse Management",
    description: "End-to-end inventory control & fulfillment with real-time stock visibility.",
  },
];

const Services = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#f5a623]">
            Services
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1e2a6e]">
            What We Deliver
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-[#f5a623] rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <Cards
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;