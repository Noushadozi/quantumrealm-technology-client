
const Footer = () => {
    return (
        <footer className="flex bg-[#4037a0] text-[#babfc2] justify-around pt-14 pb-8">
            <nav className="space-y-3">
                <header className="text-[15px">Services</header>
                <div className="flex flex-col gap-1">
                    <a className="text-[13px]">AIOT</a>
                    <a className="text-[13px]">ML</a>
                    <a className="text-[13px]">DB Architecture</a>
                    <a className="text-[13px]">Development</a>
                    <a className="text-[13px]">AI</a>
                </div>
            </nav>
            <nav className="space-y-3">
                <header className="text-[15px">Company</header>
                <div className="flex flex-col gap-1">
                    <a className="text-[13px]">About us</a>
                    <a className="text-[13px]">Contact</a>
                    <a className="text-[13px]">Jobs</a>
                    <a className="text-[13px]">Press kit</a>
                </div>
            </nav>
            <nav className="space-y-3">
                <header className="text-[15px">Legal</header>
                <div className="flex flex-col gap-1">
                    <a className="text-[13px]">Terms of use</a>
                    <a className="text-[13px]">Privacy policy</a>
                    <a className="text-[13px]">Cookie policy</a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;