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
import AllFoods from './Pages/AllFoods.jsx';
import SingleFood from './Pages/SingleFood.jsx';
import Purchase from './Pages/Purchase.jsx';
import Gallery from './Pages/Gallery.jsx';
import MyOrders from './Pages/MyOrders.jsx';
import AddFood from './Pages/AddFood.jsx';
import MyFood from './Pages/MyFood.jsx';
import UpdateFood from './Pages/UpdateFood.jsx';
import NotFound404 from './Pages/NotFound404.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component : MainLayout,
    errorElement: <NotFound404></NotFound404>,
    children : [
      {path: '/', Component: Home },
      {path:'/login', Component: Login},
      {path:'/register', Component: Register},
      {path:'/allFoods', Component:AllFoods},
      {path: '/singleFood/:id', Component: SingleFood},
      {path:'/purchase/:id', Component: Purchase},
      {path: '/gallery', Component:Gallery},
      {path: '/myOrders', Component:MyOrders},
      {path: '/addFood', Component:AddFood},
      {path: '/myFood', Component: MyFood},
      {path: '/updateFood/:id', Component:UpdateFood}
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
