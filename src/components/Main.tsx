import { useState } from "react";
import FoodCardLister from "./FoodCardLister";
import CreateAndEditModalForm from "./tailwind_elements/CreateAndEditModalForm";
import CreationButtonsContainer from "./CreationButtonsContainer";
import { FormProps } from "./tailwind_elements/Form";

interface MainProps {
  selectedFoodType: string;
}
const initialModalData: FormProps = {
  newFood: false,
  newFoodType: false,
  toBeEditedFood: undefined,
  toBeEditedFoodType: undefined,
};

function Main({ selectedFoodType }: MainProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState<FormProps>(initialModalData);
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
        <CreateAndEditModalForm
          handleDisplayModal={setDisplayModal}
          displayModal={displayModal}
          modalData={modalData}
        />
      </main>
    </>
  );
}

export default Main;
