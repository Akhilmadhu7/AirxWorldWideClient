import FindUsSection from "./FindUsSection";
import HeroSection from "./HeroSection";
import Services from "./Services";
import StatsSection from "./StatSection";
import PartnerSection from "./ui/PartnerSection";
import TrackingCard from "./TrackingCard";
import Associates from "./Associates";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrackingCard />
      <div className="mt-10">
        <StatsSection />
      </div>
      <Services/>
      <Associates/>
      <PartnerSection />
      <FindUsSection />
    </div>
  );
};

export default Home;