import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AuthProvider from './Pages/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout,
    children : [
      {path: '/', Component: Home },
      {path:'/login', Component: Login},
      {path:'/register', Component: Register}
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider  router={router}></RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
