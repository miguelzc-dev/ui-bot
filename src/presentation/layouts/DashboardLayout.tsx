import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
  return (
    <>
      <header className="bg-d bg-opacity-10 p-4 rounded-3xl">
        <img
          className="w-70 h-10 mb-2"
          alt="Construex Logo"
          src="/construex.png"
        />
      </header>
      <div className="flex flex-col border-2 rounded-3xl max-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] ">
        <main className="flex flex-row flex-grow sm:overflow-hidden overflow-y-auto gap-2">
          <nav className="hidden sm:flex flex-col w-[300px] bg-secondary p-5 rounded-3xl">
            {menuRoutes.map((option) => (
              <SidebarMenuItem key={option.to} {...option} />
            ))}
          </nav>

          <section className="flex flex-col w-full bg-secondary p-5 rounded-3xl ">
            <div className="flex flex-row h-full ">
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
