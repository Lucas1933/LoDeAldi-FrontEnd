import useDisplayFoodTypes from "../hooks/use_display_food_types";
import Nav from "./tailwind_elements/Nav";
interface NavBarProps {
  updateSelectedFoodType(foodType: string): void;
}
function NavBar({ updateSelectedFoodType }: NavBarProps) {
  const foodTypes = useDisplayFoodTypes();
  return (
    <>
      <Nav
        updateSelectedFoodType={updateSelectedFoodType}
        foodTypes={foodTypes}
      />
    </>
  );
}
export default NavBar;
