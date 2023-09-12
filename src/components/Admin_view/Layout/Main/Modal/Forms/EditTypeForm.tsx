import { foodTypeService } from "@service/index.ts";
import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";

export default function EditTypeForm(foodTypeToBeEdited: FoodTypeData) {
  const [types, setTypes] = useState<FoodTypeData[]>([]);
  const [formInputData, setFormInputData] = useState<FoodTypeData>({
    ...foodTypeToBeEdited,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await foodTypeService.updateFoodType(formInputData);
  };
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputData({ ...formInputData!, [name]: value! });
  };
  console.log(formInputData);
  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setTypes(obtainedTypes);
    }
    if (types.length == 0) {
      getTypes();
    }
    setFormInputData({ ...foodTypeToBeEdited });
  }, [foodTypeToBeEdited]);
  return (
    <form onSubmit={handleSubmit}>
      <TEInput
        onChange={onFieldChange}
        name="type"
        type="text"
        label="Nombre"
        value={formInputData.type}
        className="mb-6"
      ></TEInput>
      <TERipple rippleColor="light" className="w-full">
        <button
          type="submit"
          className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Guardar cambios
        </button>
      </TERipple>
    </form>
  );
}
