import { Avatar } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import toggleLight from "../assets/night.png";
import toggleDark from "../assets/day.png";

export const Header = (props) => {
    const dispatch = useDispatch();

    const switchGlobalTheme = () => dispatch({ type: "SWITCH" });

    return (
        <div
            className={`flex justify-end items-center gap-4 p-5 duration-700 ${
                props.selector.isLight ? "bg-[#A2AAAD]" : "bg-[#000]"
            }`}
        >
            <Avatar
                isBordered
                color="deafult"
                className="w-11 h-11"
                src="https://i.pravatar.cc/150?img=52"
            />
            <img
                className="cursor-pointer w-14 mr-2"
                src={props.selector.isLight ? toggleLight : toggleDark}
                onClick={switchGlobalTheme}
            />
        </div>
    );
};

export default Header;
