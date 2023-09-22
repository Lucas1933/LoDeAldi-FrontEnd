import { useEffect, useState } from "react";
import { foodService } from "@/service";
import FoodCard from "./FoodCard";
export default function FoodCardLister({
  selectedFoodType,
}: {
  selectedFoodType: string;
}) {
  const [foods, setFoods] = useState<FoodData[]>([]);
  useEffect(() => {
    async function getFoods() {
      const foodsToDisplay = await foodService.getFoodByType(selectedFoodType);
      setFoods(foodsToDisplay);
    }
    getFoods();
  }, [selectedFoodType]);
  return (
    <>
      <ul className="">
        {foods.map((eachFood) => {
          if (eachFood.type == "Burger") {
            return (
              <>
                <h2 className="text-white text-3xl">
                  Añadile una carne extra por{" "}
                  <span className="text-money ">$350</span>
                </h2>
                <FoodCard key={eachFood._id} food={eachFood} />
              </>
            );
          } else {
            return <FoodCard key={eachFood._id} food={eachFood} />;
          }
        })}
      </ul>
    </>
  );
}
