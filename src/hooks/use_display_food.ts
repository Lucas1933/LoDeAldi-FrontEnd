import { useEffect, useState } from "react";
import { foodService } from "../service";
import { FoodData } from "../service/food_service";
function useDisplayFood(foodType: string) {
  const [displayFood, setDisplayFood] = useState<FoodData[]>([]);
  useEffect(() => {
    async function getFoods() {
      const foods = await foodService.getFoodByType(foodType);
      setDisplayFood(foods);
    }
    if (foodType) {
      getFoods();
    }
  }, [foodType]);

  return displayFood;
}

export default useDisplayFood;
