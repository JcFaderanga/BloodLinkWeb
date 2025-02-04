import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faGauge,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { user } = useAuth();
  const [nav, setNav] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      alert("Logged out successfully!");
    }
  };

  const linkClass = ({ isActive }) =>
    `h-11 cursor-pointer flex items-center rounded-xl px-4 w-full border ${
      isActive ? " text-[#0052a2] bg-blue-50" : ""
    }`;

  const activeTextClass = (isActive) => `px-4
    ${isActive ? "text-[#0052a2] font-bold" : "text-gray"}`;
  return (
    <div className="">
      <div className="h-14 bg-white w-full flex items-center justify-between px-5">
        <button onClick={() => setNav(!nav)} className="lg:hidden">
          <FontAwesomeIcon icon={faBars} size="xl" color="#0052a2" />
        </button>
        <p className="text-lg lg:text-xl font-bold text-primary_blue">
          {user ? `${user.first_name} ${user.last_name}` : "BloodLink"}
        </p>
        {user && (
          <button onClick={handleLogout} className="font-bold">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        )}
      </div>

      <div className={`${nav ? "block" : "hidden"} h-32 bg-white w-full `}>
        <div className="flex items-center  px-5">
          <NavLink to={"/"} className={linkClass}>
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  color={isActive ? "#0052a2" : "gray"}
                />
                <h1 className={activeTextClass(isActive)}>Search</h1>
                {/* Dynamic text color */}
              </>
            )}
          </NavLink>
        </div>
        <div className="flex items-center py-2 px-5">
          <NavLink to={"/Dashboard"} className={linkClass}>
            {({ isActive }) => (
              <>
                <FontAwesomeIcon
                  icon={faGauge}
                  size="lg"
                  color={isActive ? "#0052a2" : "gray"}
                />
                <h1 className={activeTextClass(isActive)}>Dashboard</h1>
                {/* Dynamic text color */}
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
