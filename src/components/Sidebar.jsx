import { useState } from "react";
import { Link, useLocation } from "react-router";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Product", src: "product" },
        { title: "Customer", src: "customer" },
        { title: "Transaction", src: "transaction" },
    ];
    const loc = useLocation().pathname.split("/")[1];

    return (
        <div
            className={`${
                open ? "w-72" : "w-20"
            } duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}
        >
            <img
                src="../src/assets/control.png"
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple rounded-full ${
                    !open && "rotate-180"
                }`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
                <img
                    src="../src/assets/logo.png"
                    className={`cursor-pointer duration-500 ${
                        open && "rotate-[360deg]"
                    }`}
                />
                <h1
                    className={`text-white origin-left font-medium text-xl duration-300 ${
                        !open && "scale-0"
                    }`}
                >
                    Laundry
                </h1>
            </div>
            <ul className="pt-6">
                {Menus.map((menu, index) => (
                    <Link key={index} to={`/${menu.title}`.toLowerCase()}>
                        <li
                            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${
                                menu.title.toLowerCase() === loc &&
                                "bg-light-white"
                            }`}
                        >
                            <img src={`../src/assets/${menu.src}.png`} />
                            <span
                                className={`${
                                    !open && "hidden"
                                } origin-left duration-200`}
                            >
                                {menu.title}
                            </span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
