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
          <div className="bg-[url(./assets/image/site-bg.jpg)] h-[calc(100%-70px)] w-full bg-cover bg-no-repeat opacity-40 lg:rounded-tl-3xl"></div>
          <div className="absolute top-[70px] w-full md:px-16 lg:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRoutes;
