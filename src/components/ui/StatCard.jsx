const StatCard = ({ icon, value, label }) => {
  return (
    <div className="group flex flex-col items-center text-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#1e2a6e]/20 transition-all duration-300 cursor-default">

      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-[#1e2a6e]/5 group-hover:bg-[#f5a623]/10 flex items-center justify-center transition-colors duration-300">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>

      {/* Value */}
      <span className="text-4xl font-black text-[#1e2a6e] tracking-tight leading-none group-hover:text-[#f5a623] transition-colors duration-300">
        {value}
      </span>

      {/* Label */}
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 leading-snug">
        {label}
      </span>

      {/* Bottom accent line — same as ServiceCard */}
      <div className="w-8 h-0.5 bg-[#f5a623] rounded-full group-hover:w-16 transition-all duration-300" />

    </div>
  );
};

export default StatCard;