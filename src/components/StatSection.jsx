import StatCard from "./ui/StatCard";

const STATS = [
  { icon: "🏆", value: "1000+", label: "Shipments Handled in a Day" },
  { icon: "🗺️", value: "100000+", label: "Happy Customers" },
  { icon: "🤝", value: "10+",   label: "Aggregator Tieup" },
  { icon: "🌍", value: "220+",  label: "Countries Service Available" },
  { icon: "💼", value: "40+",   label: "Employees" },
];

const StatsSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* grid of individual bordered cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`${
                index === STATS.length - 1 && STATS.length % 2 !== 0
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;