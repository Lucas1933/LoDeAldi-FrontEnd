import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";

import useDisplayFoodTypes from "../../../../hooks/use_display_food_types";
import { foodService, foodTypeService } from "../../../../service";

export default function Form({
  newFood,
  newFoodType,
  foodToBeEdited,
  foodTypeToBeEdited,
}: FormProps) {
  const [formInputData, setFormInputData] = useState<FormInputData>();
  useEffect(() => {
    if (foodToBeEdited) {
      setFormInputData(foodToBeEdited);
    }
    return () => setFormInputData(undefined);
  }, [foodToBeEdited]);
  console.log(formInputData);
  const foodTypes = useDisplayFoodTypes();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("SUBMIT", formInputData);
    if (newFood) {
      await foodService.createFood(formInputData!);
    }
    if (newFoodType) {
      await foodTypeService.createFoodType(formInputData!);
    }
    if (foodToBeEdited) {
      await foodService.updateFood(formInputData!);
    }
    if (foodTypeToBeEdited) {
      await foodTypeService.updateFoodType(formInputData!);
    }
  };
  /* it handles the user input of the form */
  const onFieldChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormInputData({ ...formInputData!, [name]: value! });
  };
  return (
    <div className="block max-w-sm  rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit}>
        {newFood && (
          <>
            <h1>Nueva comida</h1>
            <TEInput
              onChange={onFieldChange}
              name="name"
              type="text"
              label="Nombre"
              className="mb-6"
            ></TEInput>
            <TEInput
              onChange={onFieldChange}
              name="price"
              type="number"
              label="Precio"
              className="mb-6"
            ></TEInput>
            {/* <!--description textarea--> */}
            <div className="relative mb-6">
              <textarea
                onChange={onFieldChange}
                name="description"
                className="focus:border-primary  peer block min-h-[auto] w-full rounded border-2 border-solid bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                id="exampleFormControlTextarea13"
                rows={3}
              ></textarea>
              <label
                htmlFor="exampleFormControlTextarea13"
                className="peer-focus:text-primary dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:bg-white motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:bg-neutral-700"
              >
                Descripcion
              </label>
            </div>

            {/* <!--types list--> */}
            <div className="relative flex flex-wrap items-stretch">
              <label
                className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                htmlFor="inputGroupSelect01"
              >
                Categoria
              </label>
              <select
                name="type"
                onChange={onFieldChange}
                className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                id="inputGroupSelect01"
              >
                <option>Selecione la categoria</option>
                {foodTypes.map((eachType) => (
                  <option key={eachType._id} value={eachType.type}>
                    {eachType.type}
                  </option>
                ))}
              </select>
            </div>
            {/* <!--Submit button--> */}
            <TERipple rippleColor="light" className="w-full my-5">
              <button
                type="submit"
                className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Añadir
              </button>
            </TERipple>
          </>
        )}

        {newFoodType && (
          <>
            <h1>Nueva categoria</h1>
            <TEInput
              onChange={onFieldChange}
              type="text"
              label="Nombre"
              className="mb-6"
            ></TEInput>
            {/* <!--Submit button--> */}
            <TERipple rippleColor="light" className="w-full">
              <button
                type="button"
                className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Añadir
              </button>
            </TERipple>
          </>
        )}

        {foodToBeEdited && (
          <>
            <TEInput
              onChange={onFieldChange}
              name="name"
              type="text"
              label="Nombre"
              defaultValue={foodToBeEdited.name}
              className="mb-6"
            ></TEInput>
            <TEInput
              onChange={onFieldChange}
              name="price"
              type="number"
              label="Precio"
              defaultValue={foodToBeEdited.price}
              className="mb-6"
            ></TEInput>
            <div className="relative mb-6">
              <textarea
                onChange={onFieldChange}
                name="description"
                className="peer border-2 block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:border-neutral-600 focus:border-primary"
                defaultValue={foodToBeEdited.description}
                id="exampleFormControlTextarea13"
                rows={3}
              ></textarea>
              <label
                htmlFor="exampleFormControlTextarea13"
                className="peer-focus:bg-white pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary dark:peer-focus:bg-neutral-700"
              >
                Descripcion
              </label>
            </div>
            <div className="relative flex flex-wrap items-stretch">
              <label
                className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                htmlFor="inputGroupSelect01"
              >
                Categoria
              </label>
              <select
                name="type"
                onChange={onFieldChange}
                className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                id="inputGroupSelect01"
              >
                <option value={foodToBeEdited.type}>
                  {foodToBeEdited.type}
                </option>
                {foodTypes.map((eachType) => (
                  <option key={eachType._id} value={eachType.type}>
                    {eachType.type}
                  </option>
                ))}
              </select>
            </div>
            <TERipple rippleColor="light" className="w-full">
              <button
                type="submit"
                className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Guardar cambios
              </button>
            </TERipple>
          </>
        )}

        {foodTypeToBeEdited && (
          <>
            <TEInput
              type="text"
              label="Nombre"
              value={foodTypeToBeEdited.type}
              className="mb-6"
            ></TEInput>
            <TERipple rippleColor="light" className="w-full">
              <button
                type="button"
                className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Añadir
              </button>
            </TERipple>
          </>
        )}
      </form>
    </div>
  );
}
