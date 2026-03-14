const Cards = ({ icon, title, description }) => {
  return (
    <div className="group flex flex-col items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#1e2a6e]/20 transition-all duration-300 cursor-pointer">
      
      {/* Icon Circle */}
      <div className="mb-5 w-14 h-14 rounded-full bg-[#1e2a6e]/8 group-hover:bg-[#f5a623]/10 flex items-center justify-center transition-colors duration-300">
        <span className="text-2xl">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-extrabold text-[#1e2a6e] uppercase tracking-wider mb-3 group-hover:text-[#f5a623] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="mt-5 w-8 h-0.5 bg-[#f5a623] rounded-full group-hover:w-16 transition-all duration-300" />
    </div>
  );
};

export default Cards;