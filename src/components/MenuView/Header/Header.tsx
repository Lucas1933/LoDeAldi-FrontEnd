import NavBar from "./NavBar";
import Info from "./Info";

export default function Header({
  updateSelectedFoodType,
}: {
  updateSelectedFoodType(foodType: string): void;
}) {
  return (
    <header>
      <Info />
      <NavBar updateSelectedFoodType={updateSelectedFoodType} />
    </header>
  );
}
