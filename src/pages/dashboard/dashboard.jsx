import React, { useState } from "react";
import { DashboardChild, Requests, Verification } from "./components";
import { useAuth } from "../../context/authContext";
import Login from "../auth/login";
const Dashboard = () => {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState("Dashboard");

  if (!user) {
    return <Login />;
  }
  return (
    <>
      <div className="w-full h-11 bg-white flex items-center justify-evenly lg:justify-start lg:px-4 lg:my-5 md:rounded-2xl ">
        <button
          className={`h-full border-b-4 mx-1 ${
            activeNav === "Dashboard"
              ? "border-blue-800"
              : "border-white hover:border-gray-300 hover:font-bold "
          } `}
          onClick={() => setActiveNav("Dashboard")}
        >
          <h4
            className={`${
              activeNav === "Dashboard"
                ? "text-primary_blue font-bold"
                : "text-black hover:text-gray-600"
            }   px-2`}
          >
            Dashboard
          </h4>
        </button>
        <button
          className={`h-full border-b-4 mx-1 ${
            activeNav === "Request"
              ? "border-blue-800"
              : "border-white hover:border-gray-300 hover:font-bold "
          } `}
          onClick={() => setActiveNav("Request")}
        >
          <h4
            className={`${
              activeNav === "Request"
                ? "text-primary_blue font-bold"
                : "text-black hover:text-gray-600"
            }   px-2`}
          >
            Request
          </h4>
        </button>

        <button
          className={`h-full border-b-4 mx-1 ${
            activeNav === "Verification"
              ? "border-blue-800"
              : "border-white hover:border-gray-300 hover:font-bold "
          } `}
          onClick={() => setActiveNav("Verification")}
        >
          <h4
            className={`${
              activeNav === "Verification"
                ? "text-primary_blue font-bold"
                : "text-black hover:text-gray-600"
            }   px-2`}
          >
            Verification
          </h4>
        </button>
      </div>
      {/* h-[calc(100%-80px)] */}
      <div className="w-full h-[80%] bg-white ">
        {activeNav === "Dashboard" && <DashboardChild />}
        {activeNav === "Request" && <Requests />}
        {activeNav === "Verification" && <Verification />}
      </div>
    </>
  );
};

export default Dashboard;
