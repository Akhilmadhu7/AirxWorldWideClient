const InfoCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Card Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-[#1e2a6e]/5 border-b border-gray-100">
        {icon && (
          <div className="w-8 h-8 rounded-full bg-[#1e2a6e]/10 flex items-center justify-center text-[#1e2a6e]">
            {icon}
          </div>
        )}
        <h3 className="text-sm font-extrabold text-[#1e2a6e] uppercase tracking-wider">
          {title}
        </h3>
      </div>

      {/* Card Body */}
      <div className="px-5 py-4">
        {children}
      </div>

    </div>
  );
};

export default InfoCard;