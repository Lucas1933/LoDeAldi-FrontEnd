import NavBar from "./components/NavBar";
import FoodCard from "./components/FoodCard/FoodCard";
import { useState } from "react";
import EditFoodModal from "./components/EditFoodModal";
export default function AdminPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [foodToBeEdited, setFoodToBeEdited] = useState(null);
  const handleTypeClick = (clickedType) => {
    setSelectedType(clickedType);
  };
  const handleOpenModal = () => {
    setIsModalActive(true);
  };
  const handleCloseModal = () => {
    setIsModalActive(false);
  };
  return (
    <>
      <header>
        <NavBar setClickedType={handleTypeClick} />
      </header>
      <main>
        <FoodCard
          typeToBeDisplayed={selectedType}
          handleOpenModal={handleOpenModal}
          setFoodToBeEdited={setFoodToBeEdited}
        />
        {isModalActive && (
          <EditFoodModal
            handleCloseModal={handleCloseModal}
            foodInfo={foodToBeEdited}
          />
        )}
      </main>
    </>
  );
}
