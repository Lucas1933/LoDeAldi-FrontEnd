import { useState } from "react";
import FoodCardLister from "./FoodCardLister/FoodCardLister";
import TypeLister from "./TypeCardLister/TypeLister";
import Modal from "./Modal/Modal";
import CreationButtonsContainer from "./CreationButtonsContainer/CreationButtonsContainer";
function Main({
  selectedFoodType,
  displayTypes,
}: {
  selectedFoodType: string;
  displayTypes: boolean;
}) {
  const [displayModal, setDisplayModal] = useState(false);
  const [isResourceChanged, setIsResourceChanged] = useState({
    hasChanged: false,
  });
  const [modalData, setModalData] = useState<ModalData>({
    foodToBeEdited: undefined,
    foodTypeToBeEdited: undefined,
    newFood: false,
    newFoodType: false,
  });
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
          isResourceChanged={isResourceChanged}
        />
      )}
      {displayTypes && (
        <TypeLister
          handleDisplayModal={setDisplayModal}
          handleModalData={setModalData}
          isResourceChanged={isResourceChanged}
        />
      )}

      <Modal
        displayModal={displayModal}
        handleDisplayModal={setDisplayModal}
        modalData={modalData}
        handleIsResourceChanged={setIsResourceChanged}
      />
    </main>
  );
}

export default Main;
