import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import ContactInfoItem from "./ui/ContactInfoItem";
import LocationCard from "./ui/LocationCard";

const LOCATIONS = [
  {
    id: 1,
    name: "Parippally Branch",
    address: "Near Medical college hospital, Parippally, Kollam - 691574",
    hours: "Monday to Saturday 9:30 am – 5:30 pm",
    email: "airxworldwide@gmail.com",
    phone: "8943479246",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16838.704262356317!2d76.73834850796699!3d8.812260372814942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05e76fccca30c1%3A0x774a724e6829fe6d!2sTrackon%20Courier%20Parippally!5e1!3m2!1sen!2sin!4v1773425178824!5m2!1sen!2sin",
  },
  {
    id: 2,
    name: "Attingal Branch",
    address: "Near meesho courier office, Attingal, kaipattimukku Trivandrum 695103",
    hours: "Monday to Saturday 9:00 am – 6:00 pm",
    email: "airxworldwide@gmail.com",
    phone: "8943479246",
    mapUrl: "https://maps.google.com/?q=8.699113,76.843887",
  },
  {
    id: 3,
    name: "Pallikkal Branch",
    address: "Near Islamic center kettidom junction, kizhakkanela 695603",
    hours: "Monday to Saturday 9:00 am – 6:00 pm",
    email: "airxworldwide@gmail.com",
    phone: "8943479246",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3942.762875166154!2d76.789402!3d8.808334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwNDgnMzAuMCJOIDc2wrA0NycyMS45IkU!5e0!3m2!1sen!2sin!4v1774684562200!5m2!1sen!2sin" ,
  },
];

const FindUsSection = () => {
  const [activeId, setActiveId] = useState(LOCATIONS[0].id);
  const active = LOCATIONS.find((l) => l.id === activeId);

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <SectionHeader badge="Find Us" title="Access Us Easily" />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left — Map */}
            <div className="lg:col-span-3 h-72 sm:h-96 lg:h-full min-h-[400px]">
              <iframe
                key={activeId}
                src={active.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map - ${active.name}`}
              />
            </div>

            {/* Right — Info */}
            <div className="lg:col-span-2 flex flex-col gap-6 p-6 sm:p-8">

              {/* Location Switcher — only show if multiple */}
              {LOCATIONS.length > 1 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Our Locations
                  </p>
                  {LOCATIONS.map((loc) => (
                    <LocationCard
                      key={loc.id}
                      location={loc}
                      isActive={loc.id === activeId}
                      onClick={() => setActiveId(loc.id)}
                    />
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="w-full h-px bg-gray-100" />

              {/* Contact Details */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#1e2a6e]">Contact with us</h3>

                <ContactInfoItem
                  icon={
                    <svg className="w-4 h-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  }
                >
                  {active.address}
                </ContactInfoItem>

                <ContactInfoItem
                  icon={
                    <svg className="w-4 h-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  }
                >
                  {active.hours}
                </ContactInfoItem>

                <ContactInfoItem
                  icon={
                    <svg className="w-4 h-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  }
                >
                  {active.email}
                </ContactInfoItem>
              </div>

              {/* CTA Button */}
              <a
                href={`tel:${active.phone}`}
                className="mt-auto flex items-center justify-center gap-2 w-full py-3.5 bg-[#1e2a6e] hover:bg-[#16205a] text-white font-semibold text-sm rounded-xl transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call us to deliver {active.phone}
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FindUsSection;