import { foodTypeService, foodService } from "@service/index.ts";
import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";

export default function EditFoodForm({
  foodToBeEdited,
  handleShowLoading,
  handleDisplayModal,
  handleIsResourceChanged,
}: {
  foodToBeEdited: FoodData;
  handleShowLoading(showLoading: boolean): void;
  handleDisplayModal(displayModal: boolean): void;
  handleIsResourceChanged(isResourceChanged: { hasChanged: boolean }): void;
}) {
  const [formInputData, setFormInputData] = useState<FoodData>({
    ...foodToBeEdited,
  });
  const [types, setTypes] = useState<FoodTypeData[]>([]);
  let deleteConfirmationClicks = 0;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleShowLoading(true);
    await foodService.updateFood(formInputData);
    handleIsResourceChanged({ hasChanged: true });
    handleShowLoading(false);
    handleDisplayModal(false);
  };
  const onFieldChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormInputData({ ...formInputData, [name]: value });
  };
  const onDelete = async () => {
    deleteConfirmationClicks++;
    if (deleteConfirmationClicks == 1) {
      alert("Presione nuevamente borrar para confirmar");
    }
    if (deleteConfirmationClicks == 2) {
      handleShowLoading(true);
      await foodService.deleteFood(formInputData._id);
      handleIsResourceChanged({ hasChanged: true });
      handleShowLoading(false);
      handleDisplayModal(false);
    }
  };
  console.log(formInputData);
  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setTypes(obtainedTypes);
    }
    getTypes();
  }, []);

  useEffect(() => {
    setFormInputData({ ...foodToBeEdited });
  }, [foodToBeEdited]);

  return (
    <form onSubmit={handleSubmit}>
      <TEInput
        onChange={onFieldChange}
        name="name"
        type="text"
        value={formInputData.name}
        label="Nombre"
        className="mb-6"
      ></TEInput>
      <TEInput
        onChange={onFieldChange}
        name="price"
        type="number"
        label="Precio"
        value={formInputData.price}
        className="mb-6"
      ></TEInput>
      <div className="relative mb-6">
        <textarea
          onChange={onFieldChange}
          name="description"
          className="peer border-2 block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:border-neutral-600 focus:border-primary"
          value={formInputData.description}
          id="descriptionTextArea"
          rows={3}
        ></textarea>
        <label
          htmlFor="descriptionTextArea"
          className="bg-white pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out  -translate-y-[0.9rem]  scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-200 text-lg dark:peer-focus:text-primary dark:peer-focus:bg-neutral-700"
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
          <option value={formInputData.type}>{formInputData.type}</option>
          {types.map((eachType) => {
            if (eachType.type != formInputData.type) {
              return (
                <option key={eachType._id} value={eachType.type}>
                  {eachType.type}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>
      <TERipple rippleColor="light" className="w-full">
        <button
          type="submit"
          className="inline-block mt-4 rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Guardar cambios
        </button>
      </TERipple>
      <TERipple>
        <button
          onClick={onDelete}
          type="button"
          className="inline-block mt-3 rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Borrar
        </button>
      </TERipple>
    </form>
  );
}
