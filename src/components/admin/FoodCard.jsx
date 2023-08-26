import { useState, useEffect } from "react";
import { foodService } from "../../services";
export default function FoodCard({ typeToBeDisplayed }) {
  console.log("rendering food card", typeToBeDisplayed);
  const [food, setFood] = useState([]);
  useEffect(() => {
    async function getFood() {
      const foods = await foodService.getFoodByType(typeToBeDisplayed);
      console.log("api call", foods);
      const mappedFood = foods.map((eachFood, index) => (
        <li key={index}>
          <div>
            <span>{eachFood.name}</span>
            <span>{eachFood.price}</span>
            <span>{eachFood.description}</span>
          </div>
        </li>
      ));
      setFood(mappedFood);
    }
    if (typeToBeDisplayed) {
      getFood();
    }
  }, [typeToBeDisplayed]);
  return (
    <>
      <ul>{food}</ul>
    </>
  );
}
