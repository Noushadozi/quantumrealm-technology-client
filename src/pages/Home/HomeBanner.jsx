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
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/2vr92pb/austin-distel-waw-Ef-Ydpkag-unsplash.jpg" alt="" />
                    </div>
                    <div data-aos="fade-up" className='flex flex-col justify-center z-500 absolute  bottom-0 right-0 p-14 space-y-3 bg-gradient-to-l from-[#f0f7f7] to-[rgba(21, 21, 21, 0.00)]'>
                        <h3 className='text-3xl font-semibold text-[#2d2929]'>
                            Where Success Meets Innovation
                        </h3>
                        <p>
                            Join the Journey of Excellence with {compName}
                        </p>
                        <button>DONATE NOW</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/d5vbDSV/dylan-gillis-Kdeq-A3a-Tn-BY-unsplash.jpg" alt="" />
                    </div>
                    <div data-aos="fade-up" className='flex flex-col justify-center z-500 absolute  bottom-0 right-0 p-14 space-y-3 bg-gradient-to-l from-[#f0f7f7] to-[rgba(21, 21, 21, 0.00)]'>
                        <h3 className='text-3xl font-semibold text-[#2d2929]'>
                            Innovation, Impact, Triumph
                        </h3>
                        <p>
                            Charting the Course of Success with {compName}
                        </p>
                        <button>DONATE NOW</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/XXSq7jH/young-male-web-designers-working-computer.jpg" alt="" />
                    </div>
                    <div data-aos="fade-up" className='flex flex-col justify-center z-500 absolute  bottom-0 right-0 p-14 space-y-3 bg-gradient-to-l from-[#f0f7f7] to-[rgba(21, 21, 21, 0.00)]'>
                        <h3 className='text-3xl font-semibold text-[#2d2929]'>
                            Unleashing Success Beyond Limits
                        </h3>
                        <p>
                            Discover the Winning Formula Behind {compName}
                        </p>
                        <button>DONATE NOW</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='h-[60vh] w-full object-cover bg-center' src="https://i.ibb.co/Zh3V33L/priscilla-du-preez-Xk-KCui44i-M0-unsplash.jpg" alt="" />
                    </div>
                    <div data-aos="fade-up" className='flex flex-col justify-center z-500 absolute  bottom-0 right-0 p-14 space-y-3 bg-gradient-to-l from-[#f0f7f7] to-[rgba(21, 21, 21, 0.00)]'>
                        <h3 className='text-3xl font-semibold text-[#2d2929]'>
                            Elevating Excellence: A Success Story
                        </h3>
                        <p>
                            Experience the Pinnacle of Innovation with {compName}
                        </p>
                        <button>DONATE NOW</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeBanner;