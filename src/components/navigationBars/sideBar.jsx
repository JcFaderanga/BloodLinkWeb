import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGauge,
  faDroplet,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const linkClass = ({ isActive }) =>
    `h-11 w-11 cursor-pointer flex items-center justify-center rounded-xl mb-2 ${
      isActive ? "bg-[#A5E6FF] text-[#0052a2]" : "hover:bg-[#A5E6FF]"
    }`;

  return (
    <div className="h-full w-16 hidden lg:justify-center lg:flex">
      <div className="block">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center p-3 rounded-xl mb-7">
          {/* <FontAwesomeIcon icon={faBars} size="xl" color="#0095CD" /> */}
        </div>

        {/* Sidebar Links */}
        <NavLink to={"/"} className={linkClass}>
          {({ isActive }) => (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              color={isActive ? "#0052a2" : "gray"}
            />
          )}
        </NavLink>

        <NavLink to={"/Dashboard"} className={linkClass}>
          {({ isActive }) => (
            <FontAwesomeIcon
              icon={faGauge}
              size="lg"
              color={isActive ? "#0052a2" : "gray"}
            />
          )}
        </NavLink>

        {/* Non-interactive Icon */}
        <div className="h-11 w-11 flex items-center justify-center rounded-xl mb-2">
          <FontAwesomeIcon icon={faDroplet} size="lg" color="gray" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
