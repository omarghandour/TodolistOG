import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import logo2 from '../src/components/pic/OGTodo-logos.jpeg'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import ErrorPage from './pages/ErrorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/todo",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

// const hh = async()=>{
//   await Notification.requestPermission();
// }
// // window.addEventListener("load")
// hh()
// const requestNotificationPermission = async()=>{
//   const permission = await Notification.requestPermission();

//   if (permission !== 'granted'){
//     throw new Error("Notification permission is not granted!")
//   }else{
//     new Notification("Hello friend", {
//       body: 'This is a test ',
//       data: {
//           Hi: "hi"
//       },
//       icon: logo2
//   })
//   }
//   }

// const checkPermission = () =>{
//   if(!('serviceWorker' in navigator)){
//     throw new Error("No support for service worker!")
//   }
//   if(!('Notification' in window)){
//     throw new Error("No support for notification API")
//   }
// }
// const registerSW = async()=>{
// const registration = await navigator.serviceWorker.register('sw.js');
// return registration;
// }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
// requestNotificationPermission();
serviceWorkerRegistration.register();
// checkPermission();
// registerSW();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
