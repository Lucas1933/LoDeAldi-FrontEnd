import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminView from "./components/AdminView/AdminView";
import MenuView from "./components/MenuView/MenuView";

import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuView />,
  },
  { path: "admin", element: <AdminView /> },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
