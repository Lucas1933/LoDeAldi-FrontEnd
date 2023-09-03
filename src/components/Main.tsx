import FoodCard from "./FoodCard";
interface MainProps {
  selectedFoodType: string;
}
function Main({ selectedFoodType }: MainProps) {
  return (
    <>
      <main>
        <FoodCard selectedFoodType={selectedFoodType} />
      </main>
    </>
  );
}

export default Main;
