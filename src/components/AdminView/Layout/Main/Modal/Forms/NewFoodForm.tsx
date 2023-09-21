import { foodTypeService, foodService } from "@service/index.ts";
import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";

export default function NewFoodForm({
  handleShowLoading,
  handleDisplayModal,
  handleIsResourceChanged,
}: {
  handleShowLoading(showLoading: boolean): void;
  handleDisplayModal(displayModal: boolean): void;
  handleIsResourceChanged(isResourceChanged: { hasChanged: boolean }): void;
}) {
  const [types, setTypes] = useState<FoodTypeData[]>([]);
  const [formInputData, setFormInputData] = useState<FormData>(new FormData());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleShowLoading(true);
    await foodService.createFood(formInputData);
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
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formInputData.append("thumbnails", files[i]);
      }
    } else {
      const { name, value } = event.target;
      formInputData.set(name, value);
    }
    setFormInputData(formInputData);
  };

  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setTypes(obtainedTypes);
    }

    getTypes();
  }, []);
  for (const [key, value] of formInputData) {
    console.log(key, value);
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1 className="m-0 mb-2 text-center">Nueva comida</h1>
      <TEInput
        onChange={onFieldChange}
        required
        name="name"
        type="text"
        label="Nombre"
        className="mb-6"
      ></TEInput>
      <TEInput
        onChange={onFieldChange}
        required
        name="price"
        type="number"
        label="Precio"
        className="mb-6"
      ></TEInput>
      {/* <!--description textarea--> */}
      <div className="relative mb-6">
        <textarea
          onChange={onFieldChange}
          required
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
          required
          onChange={onFieldChange}
          className="form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          id="inputGroupSelect01"
        >
          {types.map((eachType) => (
            <option key={eachType._id} value={eachType.type}>
              {eachType.type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3 w-96">
        <label
          htmlFor="thumbnailsFiles"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        ></label>
        <input
          name="thumbnails"
          onChange={onFieldChange}
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          accept="image/png, image/jpeg"
          id="thumbnailsFiles"
          multiple
        />
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
    </form>
  );
}
