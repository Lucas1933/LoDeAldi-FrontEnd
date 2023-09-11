import { useState } from "react";
import FoodCardLister from "./FoodCardLister/FoodCardLister";
import TypeLister from "./TypeCardLister/TypeLister";
import Modal from "./Modal/Modal";
import CreationButtonsContainer from "./CreationButtonsContainer/CreationButtonsContainer";
function Main({ selectedFoodType, displayTypes }: MainProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState<FormProps>();

  return (
    <main>
      <div>
        <CreationButtonsContainer
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
      </div>
      {!displayTypes && selectedFoodType && (
        <FoodCardLister
          selectedFoodType={selectedFoodType}
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
      )}
      {displayTypes && (
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
    </main>
  );
}

export default Main;
