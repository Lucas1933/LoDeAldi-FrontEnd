import { Routes, Route } from "react-router-dom";

import AdminView from "./components/AdminView/AdminView";
import MenuView from "./components/MenuView/MenuView";
import Login from "./components/Login/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuView />}></Route>
      <Route
        path="admin"
        element={
          <Login>
            <AdminView />
          </Login>
        }
      ></Route>
    </Routes>
  );
}
