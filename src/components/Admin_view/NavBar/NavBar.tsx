import useDisplayFoodTypes from "../../../hooks/use_display_food_types";
import Nav from "./Nav";

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
