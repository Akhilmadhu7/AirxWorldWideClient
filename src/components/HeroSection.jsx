// src/components/home/HeroSection.jsx

import { useState, useEffect } from "react";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600&auto=format&fit=crop&q=80",
    headline: "Delivering Trust, Worldwide",
    subtext: "Fast, secure and reliable international courier services at your doorstep.",
  },
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80",
    headline: "Your Package, Our Promise",
    subtext: "Every shipment handled with care — from pickup to final delivery.",
  },
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=80",
    headline: "Global Reach, Local Care",
    subtext: "Connecting businesses and families across borders with speed and safety.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">

      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${SLIDES[current].url})` }}
      />

      {/* Overlay — navy tint for brand consistency */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e2a6e]/80 via-[#1e2a6e]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div
          className={`max-w-xl transition-all duration-700 ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Badge */}
          <span className="inline-block mb-4 px-3 py-1 bg-[#f5a623] text-white text-xs font-bold uppercase tracking-widest rounded-full">
            International Courier
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {SLIDES[current].headline}
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed">
            {SLIDES[current].subtext}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-[#f5a623] hover:bg-[#e09610] text-white font-semibold rounded-md transition-colors text-sm">
              Track Your Shipment →
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold rounded-md transition-colors text-sm backdrop-blur-sm">
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-[#f5a623]"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={() => goToSlide((current - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((current + 1) % SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/30 flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </section>
  );
};

export default HeroSection;