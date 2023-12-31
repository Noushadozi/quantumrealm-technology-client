import { Map, Marker } from "pigeon-maps"

const Contact = () => {

    return (
        <div className="container mx-auto mt-[40px] mb-[80px]">
            <h2 className="text-[26px] md:text-[42px] text-[#e9bafb] mb-[15px] text-center">Our office is located at<br></br></h2>
            <p className="text-[14px] tracking-widest text-[#e9bafb] mb-[50px] text-center">Dhaka, Bangladesh.</p>
            <div className="mx-auto">
                <Map height={600} defaultCenter={[24.4769288, 90.2934413]} defaultZoom={7}>
                    <Marker width={50} anchor={[23.708552, 90.380608]} />
                </Map>
            </div>
        </div>
    );
};

export default Contact;