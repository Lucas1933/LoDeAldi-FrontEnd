import { useState } from "react";
import FoodCard from "./FoodCard";
import Modal from "./tailwind_elements/Modal";
interface MainProps {
  selectedFoodType: string;
}
function Main({ selectedFoodType }: MainProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const handleDisplayModal = (displayModal: boolean) => {
    setDisplayModal(displayModal);
  };
  return (
    <>
      <main>
        <FoodCard
          selectedFoodType={selectedFoodType}
          handleDisplayModal={handleDisplayModal}
        />
        <Modal
          handleDisplayModal={handleDisplayModal}
          displayModal={displayModal}
        />
      </main>
    </>
  );
}

export default Main;
