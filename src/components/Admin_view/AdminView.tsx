import { useState } from "react";
import Main from "./Layout/Main/Main";
import NavBar from "./Layout/NavBar";

function AdminView() {
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [displayTypes, setDisplayTypes] = useState(false);
  return (
    <>
      <header>
        <NavBar
          updateSelectedFoodType={setSelectedFoodType}
          updateSelectedType={setDisplayTypes}
        />
      </header>
      <main>
        <Main selectedFoodType={selectedFoodType} displayTypes={displayTypes} />
      </main>
    </>
  );
}

export default AdminView;
