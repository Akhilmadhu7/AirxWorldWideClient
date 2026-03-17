import FindUsSection from "./FindUsSection";
import HeroSection from "./HeroSection";
import Services from "./Services";
import StatsSection from "./StatSection";
import PartnerSection from "./ui/PartnerSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="mt-10">
        <StatsSection />
      </div>
      <Services/>
      <PartnerSection />
      <FindUsSection />
    </div>
  );
};

export default Home;