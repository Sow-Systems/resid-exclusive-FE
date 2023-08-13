import { NavLink } from "react-router-dom";
import logoSideBar from "@/assets/images/logoSideBar.svg";

const NAV_LINK_CLASS = "flex align-middle items-center mb-5";

type IsActiveClassProps = { isActive: boolean };

function isActiveClass(props: IsActiveClassProps) {
  const { isActive } = props;

  return {
    border: isActive ? "2px solid #D6D2C480" : "2px solid transparent",
    borderRadius: isActive ? "10px" : "10px",
    padding: isActive ? "10px" : "10px",
    transition: "border-color 0.2s ease-in-out",
  };
}

export function Sidebar() {
  return (
    <aside className="w-48 flex flex-col justify-between text-center">
      <div className="flex flex-col items-center text-white gap-1">
        <img src={logoSideBar} className="h-24 w-24" />
      </div>
      <nav className="m-4 flex-1 justify-center">
        <ul className="text-white">
          <NavLink className={NAV_LINK_CLASS} to="/home" style={isActiveClass}>
            Home
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/constructions"
            style={isActiveClass}
          >
            Obras
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/finance"
            style={isActiveClass}
          >
            Financeiro
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/employees"
            style={isActiveClass}
          >
            Funcionários
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/thirdParty"
            style={isActiveClass}
          >
            Terceiros
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/configuration"
            style={isActiveClass}
          >
            Configurações
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
