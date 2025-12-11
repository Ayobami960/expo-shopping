import { useUser } from "@clerk/clerk-react";
import { ShoppingBagIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { NAVIGATION } from "./Navbar";

const Sidebar = () => {
    const location = useLocation();
    const { user } = useUser();
    return (
        <div className="menu w-full grow flex justify-between">

            <div>
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                        <ShoppingBagIcon className="w-6 h-6 text-primary-content" />
                    </div>
                    <span className="text-xl font-bold is-drawer-close:hidden">Admin</span>
                </div>

                <ul className=" flex flex-col gap-5 mt-2 py-3">
                    {NAVIGATION.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`is-drawer-close:tooltip is-drawer-close:tooltip-right
                                ${isActive ? "bg-primary text-primary-content" : ""}`}
                                    data-tip={item.name}
                                >
                                    {/* Settings icon */}
                                    <span className="inline-flex items-center justify-center my-1.5">
                                        {item.icon}
                                    </span>

                                    <span className="is-drawer-close:hidden">{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>


            <div className="flex items-center gap-3">
                <div className="avatar placeholder shrink-0">
                    <img src={user?.imageUrl} alt={user?.name} className="w-10 h-10 rounded-full" />
                </div>

                <div className="flex-1 min-w-0 is-drawer-close:hidden">
                    <p className="text-sm font-semibold truncate">
                        {user?.firstName} {user?.lastName}
                    </p>

                    <p className="text-xs opacity-60 truncate">{user?.emailAddresses[0].emailAddress}</p>
                </div>
            </div>


        </div>

    )
}

export default Sidebar
