import { NavLink } from "react-router-dom";
import logoSideBar from "@/assets/images/logoSideBar.svg";
import logoFull from "@/assets/images/logoFull.png";
import constructionIcon from "@/assets/icons/construction.svg";
import dolarIcon from "@/assets/icons/dolar.svg";
import thirdpartyIcon from "@/assets/icons/thirdparty.svg";
import employeesIcon from "@/assets/icons/employees.svg";
import configIcon from "@/assets/icons/config.svg";
import { IoHomeOutline } from "react-icons/io5";
import React, { useState } from "react";

type IsActiveClassProps = { isActive: boolean };

function isActiveClass(props: IsActiveClassProps) {
  const { isActive } = props;

  return {
    background: isActive ? "#D6D2C480" : "transparent",
    padding: isActive ? "10px" : "10px",
    transition: "background 0.2s ease-in-out",
  };
}

function isActiveClassWithOptions() {
  return {
    background: "#D6D2C480",
    padding: "10px",
    transition: "background 0.2s ease-in-out",
  };
}

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [insideLinkFuncionariosExpanded, setInsideLinkFuncionariosExpanded] = useState(true);
  const [insideLinkObrasExpanded, setInsideLinkObrasExpanded] = useState(true);
  const [insideLinkTerceirosExpanded, setInsideLinkTerceirosExpanded] = useState(true);
  const [activeOption, setActiveOption] = useState("Home");

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const handleMouseEnterObras = () => {
    setInsideLinkObrasExpanded(true);
  };

  const handleMouseLeaveObras = () => {
    setInsideLinkObrasExpanded(false);
  };

  const handleMouseEnterFuncionarios = () => {
    setInsideLinkFuncionariosExpanded(true);
  };

  const handleMouseLeaveFuncionarios = () => {
    setInsideLinkFuncionariosExpanded(false);
  };

  const handleMouseEnterTerceiros = () => {
    setInsideLinkTerceirosExpanded(true);
  };

  const handleMouseLeaveTerceiros = () => {
    setInsideLinkTerceirosExpanded(false);
  };

  const SIDEBAR_CLASSES = `text-lg ${
    expanded
      ? "visible transition-opacity duration-300 ease-in-out opacity-100"
      : "hidden"
  }`;

  const NAV_LINK_CLASS = `flex align-middle items-center gap-5 p-[10px] ${
    expanded ? "justify-left m-5" : "justify-center mt-5 mb-5"
  }`;

  const SUB_TITLE_OPTION_CLASS = `${
    expanded ? "visible mt-2 flex flex-col ml-5" : "hidden"
  }`;

  const SUB_OPTION_OBRAS_CLASS = `${
    insideLinkObrasExpanded
      ? "visible transition-opacity duration-300 ease-in-out opacity-100 text-sm"
      : "hidden"
  }`;

  const SUB_OPTION_FUNCIONARIOS_CLASS = `${
    insideLinkFuncionariosExpanded
      ? "visible transition-opacity duration-300 ease-in-out opacity-100 text-sm"
      : "hidden"
  }`;

  const SUB_OPTION_TERCEIROS_CLASS = `${
    insideLinkTerceirosExpanded
      ? "visible transition-opacity duration-300 ease-in-out opacity-100 text-sm"
      : "hidden"
  }`;

  return (
    <aside
      className={`fixed top-0 h-full bg-[#1B365D] text-white ${
        expanded ? "w-64" : "w-32"
      } transition-all`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center text-white gap-1">
        <img
          src={expanded ? logoFull : logoSideBar}
          width={expanded ? 200 : 110}
          className="transition-opacity duration-300 ease-in-out opacity-100"
        />
      </div>
      <nav className="flex-1 justify-center">
        <ul className="text-white">
          <NavLink
            className={NAV_LINK_CLASS}
            to="/"
            style={isActiveClass}
            onClick={() => setActiveOption("Home")}
          >
            <IoHomeOutline size={35} />
            <p className={SIDEBAR_CLASSES}>Home</p>
          </NavLink>

          <div
            className={NAV_LINK_CLASS}
            style={activeOption === "Obras" ? isActiveClassWithOptions() : {}}
            onMouseEnter={handleMouseEnterObras}
            onMouseLeave={handleMouseLeaveObras}
          >
            <div className="flex flex-row justify-around">
              <div className="flex items-start">
                <img src={constructionIcon} />
              </div>
              <div className={SUB_TITLE_OPTION_CLASS}>
                <p className={SIDEBAR_CLASSES}>Obras</p>
                <NavLink
                  className={SUB_OPTION_OBRAS_CLASS}
                  to="/constructions"
                  style={isActiveClass}
                  onClick={() => setActiveOption("Obras")}
                >
                  Orçamentos
                </NavLink>
              </div>
            </div>
          </div>

          <NavLink
            className={NAV_LINK_CLASS}
            to="/finance"
            style={isActiveClass}
            onClick={() => setActiveOption("Financeiro")}
          >
            <img src={dolarIcon} height={35} width={35} />
            <p className={SIDEBAR_CLASSES}>Financeiro</p>
          </NavLink>

          <div
            className={NAV_LINK_CLASS}
            style={
              activeOption === "Funcionários" ? isActiveClassWithOptions() : {}
            }
            onMouseEnter={handleMouseEnterFuncionarios}
            onMouseLeave={handleMouseLeaveFuncionarios}
          >
            <div className="flex flex-row justify-around">
              <div className="flex items-start">
                <img src={employeesIcon} width={35} />
              </div>
              <div className={SUB_TITLE_OPTION_CLASS}>
                <p className={SIDEBAR_CLASSES}>Funcionários</p>
                <NavLink
                  className={SUB_OPTION_FUNCIONARIOS_CLASS}
                  to="/employees_new"
                  style={isActiveClass}
                  onClick={() => setActiveOption("Funcionários")}
                >
                  Novo Cadastro
                </NavLink>
                <NavLink
                  className={SUB_OPTION_FUNCIONARIOS_CLASS}
                  to="/employees_timesheet"
                  style={isActiveClass}
                  onClick={() => setActiveOption("Funcionários")}
                >
                  Folhas de Ponto
                </NavLink>
              </div>
            </div>
          </div>

          <div
            className={NAV_LINK_CLASS}
            style={
              activeOption === "Terceiros" ? isActiveClassWithOptions() : {}
            }
            onMouseEnter={handleMouseEnterTerceiros}
            onMouseLeave={handleMouseLeaveTerceiros}
          >
            <div className="flex flex-row justify-around">
              <div className="flex items-start">
              <img src={thirdpartyIcon} />
              </div>
              <div className={SUB_TITLE_OPTION_CLASS}>
                <p className={SIDEBAR_CLASSES}>Terceiros</p>
                <NavLink
                  className={SUB_OPTION_TERCEIROS_CLASS}
                  to="/thirdParty_new"
                  style={isActiveClass}
                  onClick={() => setActiveOption("Terceiros")}
                >
                  Novo Cadastro
                </NavLink>
                <NavLink
                  className={SUB_OPTION_TERCEIROS_CLASS}
                  to="/thirdParty_paycheck"
                  style={isActiveClass}
                  onClick={() => setActiveOption("Terceiros")}
                >
                  Folhas de Ponto
                </NavLink>
              </div>
            </div>
          </div>

          <NavLink
            className={NAV_LINK_CLASS}
            to="/configuration"
            style={isActiveClass}
            onClick={() => setActiveOption("Configurações")}
          >
            <img src={configIcon} width={35} />
            <p className={SIDEBAR_CLASSES}>Configurações</p>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
