import AddNewButton from "./AddNewButton";
import addComboIcon from "../assets/add_combo_icon.svg";
import addFoodIcon from "../assets/add_food_icon.svg";
import addTypeIcon from "../assets/add_type_icon.svg";
import { FormProps } from "./tailwind_elements/Form";
interface CreationButtonsContainerProps {
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: FormProps): void;
}
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
        actionText="Añadir combo"
        icon={addComboIcon}
        modalData={{
          newCombo: true,
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
