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
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      getFoods();
      setIsLoading(false);
      console.log("loading food lister");
    } else {
      setFoods(loadedFoods[selectedFoodType]);
    }
  }, [selectedFoodType, loadedFoods]);
  console.log(foods);
  return (
    <>
      <ul className="overflow-y-scroll h-[60vh] no-scrollbar">
        {isLoading ? (
          <div>
            <div className=" animate-pulse flex justify-evenly items-center mt-5">
              <div>
                <span
                  className="inline-block mx-2 rounded-lg  h-28 w-28 p-6
  flex-auto cursor-wait bg-current align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
              <div className="flex flex-col w-full">
                <span
                  className="inline-block rounded-full my-2 h-5 w-full px-6
  flex-auto cursor-wait bg-current align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="inline-block rounded-full my-2 h-5 w-full px-6
  flex-auto cursor-wait bg-current align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="inline-block rounded-full my-2 h-5 w-full px-6
  flex-auto cursor-wait bg-current align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
            </div>
            <div className=" animate-pulse flex justify-evenly items-center mt-5">
              <div>
                <span
                  className="inline-block mx-2 rounded-lg  h-28 w-28 p-6
flex-auto cursor-wait bg-current align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
              <div className="flex flex-col w-full">
                <span
                  className="inline-block rounded-full my-2 h-5 w-full px-6
flex-auto cursor-wait bg-current align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="inline-block rounded-full my-2 h-5 w-full px-6
flex-auto cursor-wait bg-current align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="inline-block rounded-full my-2 h-5 w-full px-6
flex-auto cursor-wait bg-current align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
            </div>
          </div>
        ) : (
          foods.map((eachFood) => {
            return <FoodCard key={eachFood._id} food={eachFood} />;
          })
        )}
      </ul>
    </>
  );
}
