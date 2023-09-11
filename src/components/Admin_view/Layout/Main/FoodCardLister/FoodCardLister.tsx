import useDisplayFood from "@hooks/use_display_food";
import FoodCard from "./FoodCard";

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
