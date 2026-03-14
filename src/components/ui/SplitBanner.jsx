const SplitBanner = ({
  image,
  imageAlt = "banner image",
  badge,
  title,
  description,
  primaryBtn,
  secondaryBtn,
  reverse = false,
  bgColor = "bg-gray-50",
}) => {
  return (
    <section className={`w-full ${bgColor} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10`}
        >

          {/* Image Side */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Card glow behind image */}
              <div className="absolute inset-0 bg-linear-to-br from-[#1e2a6e]/5 to-[#f5a623]/10 rounded-2xl" />
              <img
                src={image}
                alt={imageAlt}
                className="relative z-10 w-full h-72 sm:h-80 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-4">

            {/* Optional Badge */}
            {badge && (
              <span className="px-3 py-1 bg-[#f5a623]/10 text-[#f5a623] text-xs font-bold uppercase tracking-widest rounded-full border border-[#f5a623]/20">
                {badge}
              </span>
            )}

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2a6e] leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-base leading-relaxed">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {primaryBtn && (
                <a
                  href={primaryBtn.href || "#"}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e2a6e] hover:bg-[#16205a] text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                >
                  {primaryBtn.icon && <span>{primaryBtn.icon}</span>}
                  {primaryBtn.label}
                </a>
              )}
              {secondaryBtn && (
                <a
                  href={secondaryBtn.href || "#"}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1e2a6e] text-[#1e2a6e] hover:bg-[#1e2a6e] hover:text-white text-sm font-semibold rounded-xl transition-all duration-200"
                >
                  {secondaryBtn.icon && <span>{secondaryBtn.icon}</span>}
                  {secondaryBtn.label}
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitBanner;