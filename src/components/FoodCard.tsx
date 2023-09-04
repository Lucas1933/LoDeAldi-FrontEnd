import useDisplayFood from "../hooks/use_display_food";
import Card from "./tailwind_elements/Card";
interface FoodCardProps {
  selectedFoodType: string;
  handleDisplayModal(displayModal: boolean): void;
}

function FoodCard({ selectedFoodType, handleDisplayModal }: FoodCardProps) {
  const foodsToDisplay = useDisplayFood(selectedFoodType);
  const mappedFoods = foodsToDisplay.map((eachFood) => (
    <Card
      key={eachFood._id}
      food={eachFood}
      handleDisplayModal={handleDisplayModal}
    />
  ));
  return <>{mappedFoods}</>;
}

export default FoodCard;
