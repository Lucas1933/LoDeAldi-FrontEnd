import FoodCardLister from "./FoodCardLister/FoodCardLister";
export default function Main({
  selectedFoodType,
}: {
  selectedFoodType: string;
}) {
  return (
    <>
      <main className="">
        <FoodCardLister selectedFoodType={selectedFoodType} />
      </main>
    </>
  );
}
