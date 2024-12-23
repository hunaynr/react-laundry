const Footer = (props) => {
    return (
        <div
            className={`flex justify-center items-center p-2 -mt-2 duration-700 ${
                props.selector.isLight ? "bg-white" : "bg-[#222] text-white"
            }`}
        >
            <span className="text-sm font-normal">
                Copyright &copy; 2024 Hunayn Risatayn
            </span>
        </div>
    );
};

export default Footer;
