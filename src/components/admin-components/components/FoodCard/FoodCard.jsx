import { useState, useEffect } from "react";
import { foodService } from "../../../../services/index";
import PropTypes from "prop-types";
import EditButton from "./EditButton";
export default function FoodCard({
  typeToBeDisplayed,
  setFoodToBeEdited,
  handleOpenModal,
}) {
  const [food, setFood] = useState([]);
  useEffect(() => {
    async function getFood() {
      const foods = await foodService.getFoodByType(typeToBeDisplayed);
      const mappedFood = foods.map((eachFood, index) => (
        <li key={index}>
          <div>
            <span>{eachFood.name}</span>
            <span>{eachFood.price}</span>
            <span>{eachFood.description}</span>
            <EditButton
              handleOpenModal={handleOpenModal}
              setFoodToBeEdited={setFoodToBeEdited}
              foodInfo={eachFood}
            />
          </div>
        </li>
      ));
      setFood(mappedFood);
    }
    if (typeToBeDisplayed) {
      getFood();
    }

    /*only the type selected from the navbar is relevant, no the state of the other props*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeToBeDisplayed]);

  return (
    <>
      <ul> {food}</ul>
    </>
  );
}
FoodCard.propTypes = {
  typeToBeDisplayed: PropTypes.string,
  setFoodToBeEdited: PropTypes.func,
  handleOpenModal: PropTypes.func,
};
