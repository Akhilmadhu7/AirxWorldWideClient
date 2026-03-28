import { useState } from "react";
import airx from "../../../public/airx.png"

const NAV_LINKS = [
  // { label: "Home", href: "/" },
  // { label: "Services", href: "/services", hasDropdown: true },
  // { label: "Associates", href: "/associates" },
  // { label: "Support", href: "/support", hasDropdown: true },
  // { label: "Media", href: "/media", hasDropdown: true },
  // { label: "Career", href: "/career" },
  // { label: "FAQs", href: "/faqs" },
  // { label: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b-2 border-[#1e2a6e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="shrink-0">
            <a href="/" className="flex items-center gap-2">
              <img src={airx} alt="AirX" className="h-10 w-auto" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#1e2a6e] hover:text-[#f5a623] transition-colors rounded-md hover:bg-blue-50"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg className="w-3.5 h-3.5 text-[#1e2a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-0">
            <button className="flex items-center gap-1 px-5 py-2.5 bg-[#1e2a6e] text-white text-sm font-semibold hover:bg-[#16205a] transition-colors">
              Login
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="px-5 py-2.5 bg-[#f5a623] text-white text-sm font-semibold hover:bg-[#e09610] transition-colors">
              Track
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-[#1e2a6e] hover:text-[#f5a623] hover:bg-blue-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-100 bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#1e2a6e] hover:text-[#f5a623] hover:bg-blue-50 rounded-md transition-colors"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg className="w-3.5 h-3.5 text-[#1e2a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>
            ))}
            <div className="flex gap-2 pt-3 border-t border-blue-100 mt-2">
              <button className="flex-1 py-2.5 bg-[#1e2a6e] text-white text-sm font-semibold rounded-md hover:bg-[#16205a] transition-colors">
                Login
              </button>
              <button className="flex-1 py-2.5 bg-[#f5a623] text-white text-sm font-semibold rounded-md hover:bg-[#e09610] transition-colors">
                Track
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;