import { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Main from "./main/Main";
function AdminView() {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const updateSelectedFoodType = (foodType: string) => {
    setSelectedFoodType(foodType);
  };
  return (
    <>
      <header>
        <NavBar updateSelectedFoodType={updateSelectedFoodType} />
      </header>
      <Main selectedFoodType={selectedFoodType} />
    </>
  );
}

export default AdminView;
