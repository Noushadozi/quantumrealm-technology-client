import FaqSection from "./FaqSection";
import HomeBanner from "./HomeBanner";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <FaqSection></FaqSection>
            <ServicesSection></ServicesSection>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;