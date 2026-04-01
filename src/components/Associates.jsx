import { useRef, useEffect } from "react";
import SectionHeader from "./ui/SectionHeader";
import Cards from "./Cards";
import trackon_logo from "../../public/trackon_logo.png";
import fedex_logo from "../../public/fedex_logo.png";
import dhl_Logo from "../../public/dhl_Logo.png";
import aramex_logo_1 from "../../public/aramex_logo_1.png";
import ups_logo from "../../public/ups_logo.png";
import valmo_logo from "../../public/valmo_logo.png";
import dpd_logo from "../../public/dpd_logo.jpg";

const ASSOCIATES = [
  { name: "Trackon", logo: trackon_logo,  color: "#e63329" },
  { name: "Valmo",   logo: valmo_logo,    color: "#00b386" },
  { name: "Aramex",  logo: aramex_logo_1, color: "#cc0000" },
  { name: "DHL",     logo: dhl_Logo,      color: "#FFCC00" },
  { name: "FedEx",   logo: fedex_logo,    color: "#4d148c" },
  { name: "UPS",     logo: ups_logo,      color: "#351c15" },
  { name: "DPD",     logo: dpd_logo,      color: "#dc0032" },
];

const INFINITE_ASSOCIATES = [...ASSOCIATES, ...ASSOCIATES];

const Associates = () => {
  const scrollRef    = useRef(null);
  const animationRef = useRef(null);
  const positionRef  = useRef(0);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    const halfWidth = scroll.scrollWidth / 2;

    const animate = () => {
      positionRef.current += 2.0;

      if (positionRef.current >= halfWidth) {
        positionRef.current = 0;
      }

      scroll.scrollLeft = positionRef.current;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <SectionHeader badge="Our Network" title="Associate With" />

        <p className="text-center text-gray-400 text-sm max-w-xl mx-auto -mt-6 mb-10">
          We partner with the world's leading logistics companies to ensure
          your shipments reach every corner of the globe.
        </p>

        {/* Auto scroll row */}
        <div className="relative">

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-hidden pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {INFINITE_ASSOCIATES.map((associate, index) => (
              <Cards
                key={`${associate.name}-${index}`}
                title={associate.name}
                logo={associate.logo}
                logoFallbackColor={associate.color}
                center={true}
                fixedWidth={true}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Associates;