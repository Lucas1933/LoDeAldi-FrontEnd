import { useState, useEffect } from "react";
import FoodCardLister from "./FoodCardLister/FoodCardLister";
import TypeLister from "./TypeCardLister/TypeLister";
import Modal from "./Modal/Modal";
import CreationButtonsContainer from "./CreationButtonsContainer/CreationButtonsContainer";
function Main({ selectedFoodType, displayTypes }: MainProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState<FormProps>();
  const [showFoods, setShowFoods] = useState(true);
  const [showTypes, setShowTypes] = useState(true);

  return (
    <>
      <div>
        <CreationButtonsContainer
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
      </div>
      {showFoods && (
        <FoodCardLister
          selectedFoodType={selectedFoodType}
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
      )}
      {showTypes && (
        <TypeLister
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
      )}

      <Modal
        handleDisplayModal={setDisplayModal}
        displayModal={displayModal}
        modalData={modalData!}
      />
    </>
  );
}

export default Main;
