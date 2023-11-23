import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


// import required modules
import { Autoplay,Scrollbar } from 'swiper/modules';
const HomeBanner = () => {


    return (
        <>
            <Swiper
                scrollbar={{
                    hide: false,
                }}
                modules={[Autoplay,Scrollbar]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/2vr92pb/austin-distel-waw-Ef-Ydpkag-unsplash.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/d5vbDSV/dylan-gillis-Kdeq-A3a-Tn-BY-unsplash.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/XXSq7jH/young-male-web-designers-working-computer.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/Zh3V33L/priscilla-du-preez-Xk-KCui44i-M0-unsplash.jpg" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default HomeBanner;