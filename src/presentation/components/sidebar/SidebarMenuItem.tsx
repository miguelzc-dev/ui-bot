import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
  hidden?: boolean;
}

export const SidebarMenuItem = ({ to, icon, title, hidden }: Props) => {
  return (
    <>
      {!hidden && (
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? "flex justify-center items-center bg-primary px-5 py-2 transition-colors"
              : "flex justify-center items-center hover:bg-primary-500 px-5 py-2 transition-colors"
          }
        >
          <i className={`${icon} text-2xl mr-4 text-white`}></i>
          <div className="flex flex-col flex-grow">
            <span className="text-white text-sm font-semibold">{title}</span>
          </div>
        </NavLink>
      )}
    </>
  );
};
