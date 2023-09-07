import { foodTypeService } from "../service";
import { FoodTypeData } from "../service/food_type_service";
import { useEffect, useState } from "react";
function useDisplayFoodTypes(): FoodTypeData[] {
  const [types, setTypes] = useState<FoodTypeData[]>([]);
  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();

      setTypes(obtainedTypes);
    }
    getTypes();
  }, []);

  return types;
}
export default useDisplayFoodTypes;