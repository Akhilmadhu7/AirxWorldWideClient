const FOOTER_LINKS = {
  Services: ["Air Freight", "Surface Freight", "Express Delivery", "Warehousing", "International Shipping"],
  Company: ["About Us", "Career", "Associates", "Media", "Blog"],
  Support: ["FAQs", "Contact Us", "Track Shipment", "Branch Locator", "Raise Complaint"],
};

const Footer = () => {
  return (
    <footer className="bg-[#1e2a6e] text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-extrabold text-white tracking-tight">air</span>
                <span className="text-2xl font-extrabold text-[#f5a623] tracking-tight">X</span>
              </div>
              <p className="text-xs tracking-widest text-blue-300 uppercase mt-0.5">
                International Courier
              </p>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Delivering trust worldwide with fast, reliable, and secure international courier solutions.
            </p>
            <div className="flex gap-3 pt-1">
              {/* {["f", "in", "tw", "yt"].map((s) => (
                
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#16205a] hover:bg-[#f5a623] flex items-center justify-center text-xs font-bold text-blue-300 hover:text-white transition-all"
                >
                  {s}
                </a>
              ))} */}
              {["f", "in", "tw", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#16205a] hover:bg-[#f5a623] flex items-center justify-center text-xs font-bold text-blue-300 hover:text-white transition-all"
                >
                  {s}
                </a>
              ))} 
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[#f5a623] font-semibold text-sm mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {/* {links.map((link) => (
                  <li key={link}>
                    
                      href="#"
                      className="text-sm text-blue-200 hover:text-[#f5a623] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))} */}
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-blue-200 hover:text-[#f5a623] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2d3d8e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} AirX Worldwide International Courier. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              
                key={item}
                href="#"
                className="text-xs text-blue-300 hover:text-[#f5a623] transition-colors"
              >
                {item}
              </a>
            ))} */}
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item   }
                href="#"
                className="text-xs text-blue-300 hover:text-[#f5a623] transition-colors"
              >
                {item}
              </a>
            ))} 
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;