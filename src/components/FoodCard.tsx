import useDisplayFood from "../hooks/use_display_food";
import Card from "./tailwind_elements/Card";
interface FoodCardProps {
  selectedFoodType: string;
}

function FoodCard({ selectedFoodType }: FoodCardProps) {
  const foodsToDisplay = useDisplayFood(selectedFoodType);
  const mappedFoods = foodsToDisplay.map((eachFood) => (
    <Card key={eachFood._id} food={eachFood} />
  ));
  return <>{mappedFoods}</>;
}

export default FoodCard;
