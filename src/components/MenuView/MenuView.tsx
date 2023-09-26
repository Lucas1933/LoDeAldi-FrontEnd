import { useState } from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";

export default function MenuView() {
  const [selectedFoodType, setSelectedFoodType] = useState("Combo");

  return (
    <>
      <Header updateSelectedFoodType={setSelectedFoodType} />
      <Main selectedFoodType={selectedFoodType} />
    </>
  );
}
