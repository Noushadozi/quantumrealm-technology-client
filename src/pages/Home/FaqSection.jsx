import Title from "../../ui/Title";
import FaqAccordion from "./FaqAccordion";

const FaqSection = () => {
    return (
        <div className="md:h-[800px] flex my-[60px] mx-auto">
            <div className="w-[70%] mx-auto lg:flex items-center justify-center gap-[50px] py-[150px] md:h-[92%] my-auto
            lg:bg-[url('https://i.ibb.co/sHpKNtc/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0014-Photo-Room-png-Phot.png')] bg-no-repeat bg-right-bottom">
                <img className="h-[700px]" src="https://i.ibb.co/z5K1h2H/wepik-export-20231127175755-Qlud.jpg" alt="" />

                <div className="md:w-[80%]">
                    <div className="lg:w-[100%] flex flex-col items-center">
                        <Title
                            subTitle={"Some questions our clients asks frequently"}
                        ></Title>
                        <p className="text-[#babfc2] mb-[10px]">Lovecare gives illimitable amenities to respect seniors so that they can feel free and independent. That is why people choose lovecare.</p>
                    <FaqAccordion></FaqAccordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;