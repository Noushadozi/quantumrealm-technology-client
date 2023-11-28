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
                    delay: 200000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/nBYJSTx/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0001.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/mh618Gc/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0003.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/8jyXYmj/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0002.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/KmSvDtB/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0006.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/HBzF3BQ/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-page-0001.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/WtchWfH/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0005.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                        <img className='w-full object-cover bg-center' src="https://i.ibb.co/hsNDzSh/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0007.jpg" alt="" />
                </SwiperSlide>
            
            </Swiper>
        </div>
    );
};

export default HomeBanner;