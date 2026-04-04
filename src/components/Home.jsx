import FindUsSection from "./FindUsSection";
import HeroSection from "./HeroSection";
import Services from "./Services";
import StatsSection from "./StatSection";
import PartnerSection from "./ui/PartnerSection";
import TrackingCard from "./TrackingCard";
import Associates from "./Associates";
import VolumetricCalculator from "./VolumetricCalculator";
import CustomerQuote from "./CustomerQuote";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <TrackingCard />
      <Services />
      <StatsSection />
      <Associates />
      <PartnerSection />
      <FindUsSection />
      <VolumetricCalculator />
      <div id="get-a-quote">
        <CustomerQuote />
      </div>
    </div>
  );
};

export default Home;
