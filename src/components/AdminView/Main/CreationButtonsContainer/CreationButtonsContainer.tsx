import AddNewButton from "./AddNewButton";
import addFoodIcon from "@assets/add_food_icon.svg";
import addTypeIcon from "@assets/add_type_icon.svg";

function CreationButtonsContainer({
  handleDisplayModal,
  handleModalData,
}: {
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
}) {
  return (
    <div className="flex ">
      <div className=" mt-2">
        <AddNewButton
          actionText="Añadir comida"
          icon={addFoodIcon}
          modalData={{
            newFood: true,
          }}
          handleDisplayModal={handleDisplayModal}
          handleModalData={handleModalData}
        />
      </div>

      <div className="ml-4 mt-2">
        <AddNewButton
          actionText="Añadir categoria"
          icon={addTypeIcon}
          modalData={{
            newFoodType: true,
          }}
          handleDisplayModal={handleDisplayModal}
          handleModalData={handleModalData}
        />
      </div>
    </div>
  );
}

export default CreationButtonsContainer;
