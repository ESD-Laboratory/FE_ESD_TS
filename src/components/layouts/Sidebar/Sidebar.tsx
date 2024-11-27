import { Link, useLocation, Outlet } from "react-router-dom";
import {
  DashboardIcon,
  IonTrophyOutline,
  MaterialSymbolsEventListOutline,
  TdesignMember,
} from "../../elements/Icon/Icon";
import LogoNameEsd from "../../ui/LogoEsd/LogoNameESD";
import { useTypedDispatch } from "../../../store";
import { removeUser } from "../../../store/user";

type Router = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

const menuItemLinks: Router[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/dashboard/product",
    label: "Product",
    icon: <MaterialSymbolsEventListOutline />,
  },
  { path: "/dashboard/member", label: "Member", icon: <TdesignMember /> },
  {
    path: "/dashboard/achievement",
    label: "Achievement",
    icon: <IonTrophyOutline />,
  },
  {
    path: "/dashboard/events",
    label: "Events",
    icon: <MaterialSymbolsEventListOutline />,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useTypedDispatch();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    dispatch(removeUser);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[--gray-50] p-6">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button absolute right-2 top-2 lg:hidden"
        >
          Open drawer
        </label>
        <Outlet /> {/* This will render the matched child route component */}
      </div>
      <div className="drawer-side border-r border-[--stroke-color] ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <h1 className="p-6 text-center text-2xl font-bold"></h1>
        <LogoNameEsd />
        <ul className="l menu w-80 space-y-2 bg-[#ffffff] p-6 text-base ">
          {menuItemLinks.map((item, index) => (
            <Link to={item.path} key={index}>
              <li
                className={`cursor-pointer rounded-xl font-medium  ${
                  item.path === pathname && "bg-primaryNormal text-white"
                } `}
              >
                <div className="flex">
                  {item.icon}
                  {item.label}
                </div>
              </li>
            </Link>
          ))}
          <li
            className="cursor-pointer px-4 text-red-600"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
