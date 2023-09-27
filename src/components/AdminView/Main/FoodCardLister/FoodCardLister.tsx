import { foodService } from "@/service";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

function FoodCardLister({
  selectedFoodType,
  handleDisplayModal,
  handleModalData,
  isResourceChanged,
}: {
  selectedFoodType: string;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
  isResourceChanged: { hasChanged: boolean };
}) {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getFoods() {
      setIsLoading(true);
      const foodsToDisplay = await foodService.getFoodByType(selectedFoodType);
      setFoods(foodsToDisplay);
      setIsLoading(false);
    }
    getFoods();
  }, [selectedFoodType, isResourceChanged]);

  return (
    <>
      {isLoading ? (
        "IS LAODING"
      ) : (
        <ul className="">
          {foods.map((eachFood) => (
            <FoodCard
              key={eachFood._id}
              food={eachFood}
              handleDisplayModal={handleDisplayModal}
              handleModalData={handleModalData}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default FoodCardLister;
