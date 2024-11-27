import { useState } from "react";
import ButtonGroup from "../../ui/ButtonGroup/ButtonGroup";
import LogoNameEsd from "../../ui/LogoEsd/LogoNameESD";
import { Button } from "../../elements/Button/Button";
import Hamburger from "hamburger-react";
import NavbarLink from "./view/NavbarLink";

const Navbar = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const handleDrawer = () => {
    setIsDrawerOpened(!isDrawerOpened);
  };

  return (
    <div className="fixed w-full">
      <div className="relative z-20 flex flex-col border-b-[0.1px] border-[#e6e6e6] bg-[#ffffff]">
        <div className="container navbar mx-auto h-[80px] w-full max-w-[1440px] justify-between">
          <div className="flex gap-10">
            <div className="mx-2 flex px-2">
              <LogoNameEsd />
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal gap-4">
                <NavbarLink />
              </ul>
            </div>
          </div>
          <ButtonGroup className="flex">
            <Button className="hidden sm:flex" variant="primary">
              Our Portfolio
            </Button>
            <div className="lg:hidden">
              <Hamburger
                toggled={!!isDrawerOpened}
                toggle={setIsDrawerOpened}
                size={20}
              />
            </div>
          </ButtonGroup>
        </div>
      </div>
      <div
        className={`absolute z-10 bg-white transition-all duration-300 ease-in-out ${
          isDrawerOpened ? "top-[81px] opacity-100" : "top-[-1000px] opacity-0"
        }`}
        id="drawer"
      >
        <ul
          className={`menu w-screen p-4 transition-all duration-1000 ${
            isDrawerOpened ? "h-screen opacity-100 " : "h-0 opacity-0"
          } gap-4 bg-primaryLight`}
        >
          <NavbarLink handleDrawer={handleDrawer} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
