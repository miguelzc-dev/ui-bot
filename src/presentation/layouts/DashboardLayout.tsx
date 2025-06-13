import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col max-h-[calc(100vh)] min-h-[calc(100vh)] ">
      <main className="flex flex-row flex-grow sm:overflow-hidden overflow-y-auto">
        <nav className="flex flex-col w-1/5 bg-black gap-1 items-center">
          <img
            className="w-8/12 my-8"
            alt="Construex Logo"
            src="/construex.png"
          />
          {menuRoutes.map((option) => (
            <SidebarMenuItem key={option.to} {...option} />
          ))}
        </nav>

        <section className="flex flex-col w-full bg-white p-3">
          <div className="flex flex-row h-full ">
            <div className="flex flex-col flex-auto h-full p-1 overflow-x-auto">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
