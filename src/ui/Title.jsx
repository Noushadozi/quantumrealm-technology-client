
const Title = ({ title, subTitle, textAlign, w }) => {
    return (
        <div className={`flex flex-col items-center justify-center text-${textAlign}`}>
            <h2 className="text-[20px] font-extrabold text-[#e9bafb] my-[20px] ">{title}</h2>
            <p className={`text-[#edf1f3] font-extrabold text-[25px] w-[${w}] mb-[10px]`}>{subTitle}</p>
        </div>
    );
};

export default Title;