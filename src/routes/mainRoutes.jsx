import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar, Header } from "../components/navigationBars";

const MainRoutes = () => {
  return (
    <>
      <div className="h-screen w-full flex">
        <SideBar />
        <div className="w-full h-full relative">
          <Header />
          <div className="relative bg-cover bg-no-repeat w-full h-[calc(100%-70px)] lg:flex lg:rounded-tl-3xl">
            <div className="absolute inset-0 bg-[url(./assets/image/site-bg.jpg)] bg-cover bg-no-repeat opacity-40 pointer-events-none lg:rounded-tl-3xl"></div>
            <div className=" w-full md:px-16 lg:px-10 relative z-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRoutes;
