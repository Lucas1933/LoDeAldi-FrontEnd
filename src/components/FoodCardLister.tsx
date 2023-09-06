import useDisplayFood from "../hooks/use_display_food";
import FoodCard from "./tailwind_elements/FoodCard";
import { FormProps } from "./tailwind_elements/Form";

interface FoodCardListerProps {
  selectedFoodType: string;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: FormProps): void;
}

function FoodCardLister({
  selectedFoodType,
  handleDisplayModal,
  handleModalData,
}: FoodCardListerProps) {
  const foodsToDisplay = useDisplayFood(selectedFoodType);
  const mappedFoods = foodsToDisplay.map((eachFood) => (
    <FoodCard
      key={eachFood._id}
      food={eachFood}
      handleDisplayModal={handleDisplayModal}
      handleModalData={handleModalData}
    />
  ));
  return (
    <>
      <ul>{mappedFoods}</ul>
    </>
  );
}

export default FoodCardLister;
