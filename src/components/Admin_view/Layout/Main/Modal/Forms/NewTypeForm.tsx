import { foodTypeService } from "@service/index.ts";
import { TEInput, TERipple } from "tw-elements-react";
import { useState } from "react";

export default function NewTypeForm({
  handleShowLoading,
  handleDisplayModal,
  handleIsResourceChanged,
}: {
  handleShowLoading(showLoading: boolean): void;
  handleDisplayModal(displayModal: boolean): void;
  handleIsResourceChanged(isResourceChanged: { hasChanged: boolean }): void;
}) {
  const [formInputData, setFormInputData] =
    useState<FoodTypeDataForInsertion>();
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormInputData({ ...formInputData!, [name]: value! });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleShowLoading(true);
    await foodTypeService.createFoodType(formInputData!);
    handleIsResourceChanged({ hasChanged: true });
    handleShowLoading(false);
    handleDisplayModal(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Nueva categoria</h1>
      <TEInput
        onChange={onFieldChange}
        name="type"
        type="text"
        label="Nombre"
        className="mb-6"
      ></TEInput>
      {/* <!--Submit button--> */}
      <TERipple rippleColor="light" className="w-full">
        <button
          type="submit"
          className="inline-block rounded w-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Añadir
        </button>
      </TERipple>
    </form>
  );
}
