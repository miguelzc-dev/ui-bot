import { NavLink, useSearchParams } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
  hidden?: boolean;
}

export const SidebarMenuItem = ({ to, icon, title, hidden }: Props) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      {!hidden && (
        <NavLink
          to={{ pathname: to, search: searchParams.toString() }}
          className={({ isActive }) =>
            isActive
              ? "flex justify-center items-center bg-primary px-5 py-2 transition-colors"
              : "flex justify-center items-center hover:bg-primary-500 px-5 py-2 transition-colors"
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
