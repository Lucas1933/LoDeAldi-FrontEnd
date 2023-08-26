import NavBar from "./NavBar";
import FoodCard from "./FoodCard";
import { useState } from "react";
export default function AdminPage() {
  const [selectedType, setSelectedType] = useState(null);
  console.log("rendering?", selectedType);
  const handleTypeClick = (clickedType) => {
    setSelectedType(clickedType);
  };
  return (
    <>
      <header>
        <NavBar setClickedType={handleTypeClick} />
      </header>
      <main>
        <FoodCard typeToBeDisplayed={selectedType} />
      </main>
    </>
  );
}
