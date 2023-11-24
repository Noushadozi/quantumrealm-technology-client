
const Title = ({ title, subTitle, textAlign, w }) => {
    return (
        <div className={`flex flex-col items-center justify-center text-${textAlign}`}>
            <h2 className="text-[20px] font-extrabold text-[#5bb286] my-[20px]">{title}</h2>
            <p className={`text-[#2d2929] font-extrabold text-[25px] w-[${w}] mb-[10px]`}>{subTitle}</p>
        </div>
    );
};

export default Title;