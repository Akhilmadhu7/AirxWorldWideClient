const StatCard = ({ value, label }) => {
  return (
    <div className="group flex flex-col items-center text-center gap-2 px-6 py-8 cursor-default">

      {/* Value */}
      <span className="text-4xl sm:text-5xl font-black text-[#1e2a6e] group-hover:text-[#f5a623] tracking-tight leading-none transition-colors duration-300">
        {value}
      </span>

      {/* Label */}
      <span className="text-sm text-gray-500 font-medium leading-snug">
        {label}
      </span>

    </div>
  );
};

export default StatCard;