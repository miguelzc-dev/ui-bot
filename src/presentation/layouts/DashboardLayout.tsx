import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
  return (
    <>
      {/* <header className="bg-opacity-10 p-4 rounded-3xl">
        <img
          className="w-70 h-10 mb-2"
          alt="Construex Logo"
          src="/construex.png"
        />
      </header> */}
      <div className="flex flex-col rounded-3xl h-[100vh]">
        <main className="flex flex-row flex-grow sm:overflow-hidden overflow-y-auto gap-2">
          <nav className="hidden sm:flex flex-col w-[318px] bg-secondary py-5">
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

          <section className="flex flex-col w-full p-10">
            <div className="flex flex-row h-full">
              <div className="flex flex-col flex-auto h-full p-1 overflow-x-auto">
                <Outlet />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
