import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";
import { useEffect, useState } from "react";

export const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-[100vh] overflow-x-hidden">
      <main className="flex flex-row flex-grow overflow-hidden overflow-y-auto gap-2">
        <nav
          className={`${
            isMobile && !openMenu && "hidden"
          } sm:flex flex-col w-[318px] min-w-[250px] bg-secondary py-5`}
        >
          <div className="px-5">
            <img
              className="w-full h-auto mt-4 mb-6"
              alt="Construex Logo"
              src="/construex.png"
            />
          </div>

          {menuRoutes.map((option) => (
            <SidebarMenuItem key={option.to} {...option} />
          ))}
        </nav>

        <section className="flex flex-col w-full sm:p-10 relative min-w-[320px]">
          <button
            className="absolute top-0 left-0 block sm:hidden ml-2 mt-2 fa-solid fa-bars"
            onClick={() => setOpenMenu(!openMenu)}
          />
          <div className={`flex flex-row h-full ${isMobile && openMenu && '' }`}>
            <div className="flex flex-col flex-auto h-full p-1 overflow-x-auto">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
