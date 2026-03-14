import FindUsSection from "./FindUsSection";
import HeroSection from "./HeroSection";
import Services from "./Services";
import PartnerSection from "./ui/PartnerSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Services/>
      <PartnerSection />
      <FindUsSection />
    </div>
  );
};

export default Home;