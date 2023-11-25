import Title from "../../ui/Title";
import FaqAccordion from "./FaqAccordion";

const FaqSection = () => {
    return (
        <div className="bg-[#f0f7f7] md:h-[800px] flex my-[60px]">
            <div className="w-[70%] mx-auto lg:flex items-center justify-center gap-[50px] py-[150px] md:h-[92%] my-auto
            lg:bg-[url('https://lovecare.smartdemowp.com/wp-content/themes/lovecare/assets/images/shapes/faq-2-dot.png')] bg-no-repeat bg-left-bottom">
                <img src="https://lovecare.smartdemowp.com/wp-content/uploads/faq-2-1.jpeg" alt="" />

                <div className="md:w-[80%]">
                    <Title
                    title={"Frequently asked questions"}
                    subTitle={"Some questions our clients asks frequently"}
                    ></Title>
                    <p className="text-[#babfc2] mb-[10px]">Lovecare gives illimitable amenities to respect seniors so that they can feel free and independent. That is why people choose lovecare.</p>
                    <FaqAccordion></FaqAccordion>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;