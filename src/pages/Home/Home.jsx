import FaqSection from "./FaqSection";
import HomeBanner from "./HomeBanner";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <ServicesSection></ServicesSection>
            <TestimonialsSection></TestimonialsSection>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;