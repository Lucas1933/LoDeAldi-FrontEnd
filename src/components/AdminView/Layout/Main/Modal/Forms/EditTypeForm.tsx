import { foodTypeService } from "@service/index.ts";
import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";

export default function EditTypeForm({
  foodTypeToBeEdited,
  handleShowLoading,
  handleDisplayModal,
  handleIsResourceChanged,
}: {
  foodTypeToBeEdited: FoodTypeData;
  handleShowLoading(showLoading: boolean): void;
  handleDisplayModal(displayModal: boolean): void;
  handleIsResourceChanged(isResourceChanged: { hasChanged: boolean }): void;
}) {
  const [formInputData, setFormInputData] = useState<FoodTypeData>({
    ...foodTypeToBeEdited,
  });
  let deleteConfirmationClicks = 0;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleShowLoading(true);
    await foodTypeService.updateFoodType(formInputData);
    handleIsResourceChanged({ hasChanged: true });
    handleShowLoading(false);
    handleDisplayModal(false);
  };
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputData({ ...formInputData!, [name]: value! });
  };
  const onDelete = async () => {
    deleteConfirmationClicks++;
    if (deleteConfirmationClicks == 1) {
      alert("Presione nuevamente borrar para confirmar");
    }
    if (deleteConfirmationClicks == 2) {
      handleShowLoading(true);
      await foodTypeService.deleteFoodType(formInputData._id);
      handleIsResourceChanged({ hasChanged: true });
      handleShowLoading(false);
      handleDisplayModal(false);
    }
  };

  useEffect(() => {
    setFormInputData({
      ...foodTypeToBeEdited,
    });
  }, [foodTypeToBeEdited]);

  return (
    <form onSubmit={handleSubmit}>
      <TEInput
        onChange={onFieldChange}
        required
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
