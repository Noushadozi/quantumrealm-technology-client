import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Title from '../../ui/Title';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const ServicesSection = () => {
    const axiosPublic = useAxiosPublic();
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#e9bafb");
    const { data: servicesData, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: () => axiosPublic.get('services')
    })
    if (isLoading) {
        return <div className="text-center mt-[150px]">
            <PulseLoader
                color={color}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }
    return (
        <div className="my-[80px] lg:w-[90%] xl:w-[80%] mx-auto lg:bg-[url('https://i.ibb.co/NF7sNMm/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0005-Photo-Room-png-Phot.png')] bg-no-repeat bg-right-bottom">
            <div className='mb-[70px]'>
                <Title
                    title={"01.Services"}
                    subTitle={"Next-gen Tech Solutions for Seamless Digital Transformation."}
                    textAlign={"center"}
                    w={"50%"}
                ></Title>
            </div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    servicesData.data.map((service, index) => <SwiperSlide key={index}>
                        <div className='flex flex-col items-center justify-center shadow-xl shadow-[#6444d1] rounded-lg text-[#001f4b] h-[400px] bg-gradient-to-r from-[#14abe3] to-[#00fce7] mb-[50px]'>

                            <img className='px-[40px] pt-[20px] md:px-[60px] md:pt-[25px] lg:px-[70px] lg:pt-[30px] max-h-[250px]' src={service.image_url} alt="" />
                            <h2 className='text-[23px] font-bold my-3 text-center'>{service.title}</h2>
                            <p className='text-[15px] text-center mb-4 w-[80%]'>{service.subtitle}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default ServicesSection;