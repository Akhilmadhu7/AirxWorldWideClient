import SectionHeader from "./ui/SectionHeader";
import Cards from "./Cards";
import pic_1 from "../../public/pic_1.jpeg";
import trackon_logo from "../../public/trackon_logo.png"
import fedex_logo from "../../public/fedex_logo.png"
import dhl_Logo from "../../public/dhl_Logo.png"
import aramex_logo from "../../public/aramex_logo.png"
import ups_logo from "../../public/ups_logo.png"
import valmo_logo from "../../public/valmo_logo.png"
import dpd_logo from "../../public/dpd_logo.jpg"

const ASSOCIATES = [
  {
    name: "Trackon",
    logo: trackon_logo,
    color: "#e63329",
  },
  {
    name: "Valmo",
    logo: valmo_logo,
    color: "#00b386",
  },
  {
    name: "Aramex",
    logo: aramex_logo,
    color: "#cc0000",
  },
  {
    name: "DHL",
    logo: dhl_Logo,
    color: "#FFCC00",
  },
  {
    name: "FedEx",
    logo: fedex_logo,
    color: "#4d148c",
  },
  {
    name: "UPS",
    logo: ups_logo,
    color: "#351c15",
  },
  {
    name: "DPD",
    logo: dpd_logo,
    color: "#dc0032",
  },
];

const Associates = () => {
  return (
    <section className="w-full bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <SectionHeader badge="Our Network" title="Associate With" />

        {/* Description */}
        <p className="text-center text-gray-400 text-sm max-w-xl mx-auto -mt-6 mb-10">
          We partner with the world's leading logistics companies to ensure
          your shipments reach every corner of the globe.
        </p>

        {/* Mobile/Tablet — Horizontal scroll row — hidden on lg */}
        <div className="lg:hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable row */}
          <div
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ASSOCIATES.map((associate) => (
              <Cards
                key={associate.name}
                title={associate.name}
                logo={associate.logo}
                logoFallbackColor={associate.color}
                center={true}
                fixedWidth={true}
              />
            ))}
          </div>

          {/* Scroll hint — mobile only */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:hidden">
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs text-gray-400">Scroll to see all partners</span>
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Desktop — Grid — hidden below lg */}
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-5">
          {ASSOCIATES.map((associate) => (
            <Cards
              key={associate.name}
              title={associate.name}
              logo={associate.logo}
              logoFallbackColor={associate.color}
              center={true}
              fixedWidth={false}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Associates;