import { useState } from "react";
import Main from "./Layout/Main/Main";
import NavBar from "./Layout/NavBar";

function AdminView() {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [displayTypes, setDisplayTypes] = useState(false);

  return (
    <>
      <NavBar
        updateSelectedFoodType={setSelectedFoodType}
        updateSelectedType={setDisplayTypes}
      />
      <Main selectedFoodType={selectedFoodType} displayTypes={displayTypes} />
    </>
  );
}

export default AdminView;
