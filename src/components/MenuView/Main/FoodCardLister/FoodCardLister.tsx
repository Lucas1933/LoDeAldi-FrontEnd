import { useEffect, useState } from "react";

import { foodService } from "@/service";
import FoodCard from "./FoodCard";
export default function FoodCardLister({
  selectedFoodType,
}: {
  selectedFoodType: string;
}) {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [loadedFoods, setLoadedFoods] = useState<{ [key: string]: FoodData[] }>(
    {}
  );
  /*  const [wasFoodTypeAlreadyLoaded, setWasFoodTypeAlreadyLoaded] =
    useState(false); */

  useEffect(() => {
    async function getFoods() {
      if (selectedFoodType) {
        const foodsToDisplay = await foodService.getFoodByType(
          selectedFoodType
        );
        setFoods(foodsToDisplay);
        loadedFoods[foodsToDisplay[0].type] = foodsToDisplay;
        setLoadedFoods(loadedFoods);
      }
    }
    if (!Object.keys(loadedFoods).includes(selectedFoodType)) {
      getFoods();
    } else {
      setFoods(loadedFoods[selectedFoodType]);
    }
  }, [selectedFoodType, loadedFoods]);
  console.log(foods);
  return (
    <>
      {selectedFoodType && (
        <ul className="overflow-y-scroll h-[50vh]">
          {foods.map((eachFood) => {
            return <FoodCard key={eachFood._id} food={eachFood} />;
          })}
        </ul>
      )}
    </>
  );
}
