import NavBar from "./NavBar";
import { useState } from "react";
import Main from "./Main/Main";
export default function MenuView() {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  console.log(selectedFoodType);
  return (
    <>
      <header>
        <NavBar updateSelectedFoodType={setSelectedFoodType} />
      </header>

      <Main selectedFoodType={selectedFoodType} />

      {/* navbar */}
      {/* main que va a displayar el type de la navbar{
      food card lister
      icono de wsp
    } */}
    </>
  );
}
