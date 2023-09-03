import useDisplayFoodTypes from "../hooks/use_display_food_types";
interface NavBarProps {
  updateSelectedFoodType(foodType: string): void;
}
function NavBar({ updateSelectedFoodType }: NavBarProps) {
  const foodTypes = useDisplayFoodTypes();
  const handleFoodTypeSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedFoodType = event.currentTarget.getAttribute("data-foodtype")!;
    updateSelectedFoodType(selectedFoodType);
  };

  return (
    <>
      <ul>
        {foodTypes.map((eachType) => (
          <li key={eachType._id}>
            <button
              onClick={handleFoodTypeSelection}
              data-foodtype={eachType.type}
            >
              {eachType.type}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default NavBar;
