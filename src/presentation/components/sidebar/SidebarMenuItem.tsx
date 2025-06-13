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
              ? "flex justify-center items-center bg-primary-500 p-2 w-full"
              : "flex justify-center items-center hover:bg-primary-500 p-2 w-full"
          }
        >
          <img src={icon} className="text-base mr-4" />
          <div className="flex flex-col flex-grow">
            <span className="text-white text-sm font-xs">{title}</span>
          </div>
        </NavLink>
      )}
    </>
  );
};
