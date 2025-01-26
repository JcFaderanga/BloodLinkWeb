import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGauge,
  faDroplet,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const SideBar = () => {
  // const navigate = useNavigate();
  const goToDashboard = () => {
    // navigate(`/dashboard`);
  };
  return (
    <div className="h-full w-16 hidden lg:justify-center lg:flex">
      <div className="block">
        <div className="flex items-center justify-center  p-3 rounded-xl mb-7">
          <FontAwesomeIcon icon={faBars} size="xl" color="#0052a2" />
        </div>
        <div className="h-11 w-11 cursor-pointer flex items-center justify-center bg-[#A5E6FF] rounded-xl mb-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="#0095CD" />
        </div>
        <div className="h-11 w-11 cursor-pointer flex items-center justify-center rounded-xl mb-2">
          <button onClick={goToDashboard}>
            <FontAwesomeIcon icon={faGauge} size="lg" color="gray" />
          </button>
        </div>
        <div className="h-11 w-11 cursor-pointer flex items-center justify-center rounded-xl mb-2">
          <FontAwesomeIcon icon={faDroplet} size="lg" color="gray" />
        </div>
      </div>
      {/* <Link /> */}
    </div>
  );
};

export default SideBar;
