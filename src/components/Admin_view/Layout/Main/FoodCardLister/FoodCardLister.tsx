import { foodService } from "@/service";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

function FoodCardLister({
  selectedFoodType,
  handleDisplayModal,
  handleModalData,
}: FoodCardListerProps) {
  const [foods, setFoods] = useState<FoodData[]>([]);
  useEffect(() => {
    async function getFoods() {
      const foodsToDisplay = await foodService.getFoodByType(selectedFoodType);
      setFoods(foodsToDisplay);
    }
    getFoods();
  });
  const mappedFoods = foods.map((eachFood) => (
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
