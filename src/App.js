import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import Home from './pages/home/home';
import MainRoutes from './routes/mainRoutes';
import UserPage from './pages/userPage';
import Dashboard from './pages/dashboard/dashboard';
import NotFound from './pages/notFound';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainRoutes/>}>
      <Route index element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Search/UserPage/:type/:userId/:subId" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    
  );
};

export default App;
