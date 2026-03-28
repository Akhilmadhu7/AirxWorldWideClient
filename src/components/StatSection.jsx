import StatCard from "./ui/StatCard";

const STATS = [
  { value: "1000+",   label: "Shipments Handled in a Day" },
  { value: "100000+", label: "Happy Customers" },
  { value: "10+",     label: "Aggregator Tieup" },
  { value: "220+",    label: "Countries Service Available" },
  { value: "40+",     label: "Employees" },
];

const StatsSection = () => {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300
                ${index === STATS.length - 1 && STATS.length % 2 !== 0
                  ? "col-span-2 sm:col-span-1"
                  : ""
                }`}
            >
              <StatCard value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;