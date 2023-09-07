import { useState } from "react";
import FoodCardLister from "./FoodCardLister/FoodCardLister";
import Modal from "./Modal/Modal";
import CreationButtonsContainer from "./CreationButtonsContainer/CreationButtonsContainer";

function Main({ selectedFoodType }: MainProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>();
  return (
    <>
      <main>
        <CreationButtonsContainer
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
        <FoodCardLister
          selectedFoodType={selectedFoodType}
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
        />
        <Modal
          handleDisplayModal={setDisplayModal}
          displayModal={displayModal}
          modalData={modalData!}
        />
      </main>
    </>
  );
}

export default Main;
