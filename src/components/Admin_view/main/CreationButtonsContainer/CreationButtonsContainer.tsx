import AddNewButton from "./AddNewButton";
import addFoodIcon from "../../../../assets/add_food_icon.svg";
import addTypeIcon from "../../../../assets/add_type_icon.svg";

function CreationButtonsContainer({
  handleDisplayModal,
  handleModalData,
}: CreationButtonsContainerProps) {
  return (
    <div>
      <AddNewButton
        actionText="Añadir comida"
        icon={addFoodIcon}
        modalData={{
          newFood: true,
        }}
        handleDisplayModal={handleDisplayModal}
        handleModalData={handleModalData}
      />

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
  );
}

export default CreationButtonsContainer;
