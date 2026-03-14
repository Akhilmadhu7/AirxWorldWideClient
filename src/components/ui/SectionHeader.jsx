const SectionHeader = ({ badge, title, center = true }) => {
  return (
    <div className={`mb-10 ${center ? "text-center" : "text-left"}`}>
      {badge && (
        <span className="text-xs font-bold uppercase tracking-widest text-[#f5a623]">
          {badge}
        </span>
      )}
      <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1e2a6e]">
        {title}
      </h2>
      <div className={`mt-3 w-12 h-1 bg-[#f5a623] rounded-full ${center ? "mx-auto" : ""}`} />
    </div>
  );
};

export default SectionHeader;