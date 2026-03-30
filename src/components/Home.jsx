import FindUsSection from "./FindUsSection";
import HeroSection from "./HeroSection";
import Services from "./Services";
import StatsSection from "./StatSection";
import PartnerSection from "./ui/PartnerSection";
import TrackingCard from "./TrackingCard";
import Associates from "./Associates";
import VolumetricCalculator from "./volumetricCalculator";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <TrackingCard />
      <Services />
      {/* <div className="mt-10"> */}
        <StatsSection />
      {/* </div> */}
      <Associates />
      <VolumetricCalculator/>
      <PartnerSection />
      <FindUsSection />
    </div>
  );
};

export default Home;