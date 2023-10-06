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
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  /*  const [wasFoodTypeAlreadyLoaded, setWasFoodTypeAlreadyLoaded] =
    useState(false); */

  useEffect(() => {
    async function getFoods() {
      if (selectedFoodType) {
        const foodsToDisplay =
          await foodService.getFoodByType(selectedFoodType);
        setFoods(foodsToDisplay);
        loadedFoods[foodsToDisplay[0].type] = foodsToDisplay;
        setLoadedFoods(loadedFoods);
      }
    }
    if (!Object.keys(loadedFoods).includes(selectedFoodType)) {
      setIsLoading(true);
      getFoods();
      setIsLoading(false);
    } else {
      setFoods(loadedFoods[selectedFoodType]);
    }
  }, [selectedFoodType, loadedFoods]);

  return (
    <>
      <ul className="no-scrollbar h-[60vh] overflow-y-scroll">
        {isLoading ? (
          <div>
            <div className=" mt-5 flex animate-pulse items-center justify-evenly">
              <div>
                <span
                  className="mx-2 inline-block h-28  w-28 flex-auto cursor-wait
  rounded-lg bg-current p-6 align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
              <div className="flex w-full flex-col">
                <span
                  className="my-2 inline-block h-5 w-full flex-auto cursor-wait
  rounded-full bg-current px-6 align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="my-2 inline-block h-5 w-full flex-auto cursor-wait
  rounded-full bg-current px-6 align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="my-2 inline-block h-5 w-full flex-auto cursor-wait
  rounded-full bg-current px-6 align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
            </div>
            <div className=" mt-5 flex animate-pulse items-center justify-evenly">
              <div>
                <span
                  className="mx-2 inline-block h-28  w-28 flex-auto cursor-wait
rounded-lg bg-current p-6 align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
              </div>
              <div className="flex w-full flex-col">
                <span
                  className="my-2 inline-block h-5 w-full flex-auto cursor-wait
rounded-full bg-current px-6 align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="my-2 inline-block h-5 w-full flex-auto cursor-wait
rounded-full bg-current px-6 align-middle text-base
 text-neutral-700 opacity-50 dark:text-neutral-50"
                ></span>
                <span
                  className="my-2 inline-block h-5 w-full flex-auto cursor-wait
rounded-full bg-current px-6 align-middle text-base
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
