import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Autoplay, Scrollbar } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css'
AOS.init();

const HomeBanner = () => {
    let compName = 'employee management';

    

    return (
        <div className='relative lg:w-[90%] xl:w-[80%] mx-auto'>
            <Swiper
                scrollbar={{
                    hide: false,
                }}
                modules={[Autoplay, Scrollbar]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/K76qQVH/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0001.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/Jym2g5Y/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0002.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/87McZ3X/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0003.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/qBSfP6W/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0004.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/CJK7C7J/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0005.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/nQFfFw2/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0006.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/PZX5LS2/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0007.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeBanner;