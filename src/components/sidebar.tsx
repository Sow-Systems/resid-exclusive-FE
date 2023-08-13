import { NavLink } from "react-router-dom";
// import logoSideBar from "@/assets/images/logoSideBar.svg";
import logoFull from "@/assets/images/logoFull.png";
import constructionIcon from "@/assets/icons/construction.svg"
import dolarIcon from "@/assets/icons/dolar.svg"
import thirdpartyIcon from "@/assets/icons/thirdparty.svg"
import employeesIcon from "@/assets/icons/employees.svg"
import configIcon from "@/assets/icons/config.svg"
import { IoHomeOutline } from "react-icons/io5";

const NAV_LINK_CLASS = "flex align-middle items-center mb-5 m-3 gap-3";

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
    <aside className="flex flex-col justify-between text-center">
      <div className="flex flex-col items-center text-white gap-1">
        {/* <img src={logoSideBar} /> */}
        <img src={logoFull} />
      </div>
      <p className="text-colorMenuText text-left pl-9">Menu</p>
      <nav className="m-3 flex-1 justify-center">
        <ul className="text-white">
          <NavLink className={NAV_LINK_CLASS} to="/home" style={isActiveClass}>
            <IoHomeOutline size={35} />
            <p className="text-lg">Home</p>
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/constructions"
            style={isActiveClass}
          >
            <img src={constructionIcon} />
            <p className="text-lg">Obras</p>
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/finance"
            style={isActiveClass}
          >
            <img src={dolarIcon} height={35} width={35} />
            <p className="text-lg">Financeiro</p>
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/employees"
            style={isActiveClass}
          >
            <img src={employeesIcon} height={35} width={35} />
            <p className="text-lg">Funcionários</p>
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/thirdParty"
            style={isActiveClass}
          >
            <img src={thirdpartyIcon} height={35} width={35} />
            <p className="text-lg">Terceiros</p>
          </NavLink>
          <NavLink
            className={NAV_LINK_CLASS}
            to="/configuration"
            style={isActiveClass}
          >
            <img src={configIcon} height={35} width={35} />
            <p className="text-lg">Configurações</p>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
