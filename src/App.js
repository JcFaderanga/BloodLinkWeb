import React, { useState, useEffect } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SideBar, Header } from './components/navigationBars';
import { AuthProvider } from './context/authContext';
const App = () => {
  return (
    <AuthProvider>
    <div className="h-screen w-full flex">
      <SideBar />
      <div className="w-full h-full relative">
        <Header />
        <div className="bg-[url(./assets/image/site-bg.jpg)] h-[calc(100%-70px)] w-full bg-cover bg-no-repeat opacity-30 lg:rounded-tl-3xl"></div>
        <div className="absolute top-[70px] w-full md:px-16 lg:px-10">    
          <AppRoutes />
        </div>
      </div>
    </div>
    </AuthProvider>
  );
};

export default App;
