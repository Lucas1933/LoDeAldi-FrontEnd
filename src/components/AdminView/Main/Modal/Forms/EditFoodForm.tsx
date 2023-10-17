import { foodTypeService, foodService } from "@service/index.ts";
import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useRef, useState } from "react";

import closeIcon from "@assets/close-icon.svg";

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
  const [updatedThumbnails, setUpdatedThumbnails] = useState([]);
  const [imgsToDelete, setImgsToDelete] = useState<string[]>([]);
  const thumbnailsDivRef = useRef<HTMLDivElement>(null);
  const [
    imageToBeDeleteModalBeingDisplayed,
    setImageToBeDeleteModalBeingDisplayed,
  ] = useState<EventTarget & HTMLImageElement>();
  const deleteImgModalRef = useRef<HTMLDivElement>(null);
  const imgToBeDeletedRef = useRef<HTMLImageElement>(null);
  let deleteConfirmationClicks = 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleShowLoading(true);
    for (const eachImg of imgsToDelete) {
      await foodService.deleteImage(
        eachImg,
        foodToBeEdited.type,
        foodToBeEdited._id,
      );
    }
    const removedThumbnails = formInputData.thumbnails.filter(
      (eachImg) => !imgsToDelete.includes(eachImg),
    );
    formInputData.thumbnails = removedThumbnails;
    await foodService.updateFood(formInputData);
    handleIsResourceChanged({ hasChanged: true });
    handleShowLoading(false);
    handleDisplayModal(false);
  };
  const onFieldChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
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

  const onImgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    deleteConfirmationClicks = 0;
    setImageToBeDeleteModalBeingDisplayed(event.currentTarget);
    imgToBeDeletedRef.current!.src = event.currentTarget.src;
    deleteImgModalRef.current?.classList.remove("hidden");
  };
  const onCloseIconClick = () => {
    deleteConfirmationClicks = 0;
    deleteImgModalRef.current?.classList.add("hidden");
  };
  const onImgDelete = async () => {
    deleteConfirmationClicks++;
    if (deleteConfirmationClicks == 1) {
      alert("Presione nuevamente borrar para confirmar");
    }
    if (deleteConfirmationClicks == 2) {
      const imgName = imgToBeDeletedRef.current!.src.split("/");
      imgsToDelete.push(imgName[imgName.length - 1]);
      imageToBeDeleteModalBeingDisplayed?.classList.add("hidden");
      onCloseIconClick();
    }
  };
  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setTypes(obtainedTypes);
    }
    getTypes();
  }, []);

  useEffect(() => {
    setUpdatedThumbnails([""]);
    const updatedThumbnails = foodToBeEdited.thumbnails.map((imgName) => {
      return (
        import.meta.env.VITE_LO_DE_ALDI_API +
        "food/" +
        foodToBeEdited.type +
        "/" +
        imgName
      );
    });
    setUpdatedThumbnails(updatedThumbnails);
  }, [foodToBeEdited.thumbnails, foodToBeEdited.type]);

  return (
    <>
      <div>
        {" "}
        <button
          type="button"
          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          onClick={() => {
            handleDisplayModal(false);
            const images = Array.from(thumbnailsDivRef.current!.children);
            images.forEach((eachImg) => {
              eachImg.classList.remove("hidden");
            });
            setImgsToDelete([]);
          }}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <TEInput
          onChange={onFieldChange}
          name="name"
          type="text"
          value={formInputData.name}
          label="Nombre"
          className="mb-6 mt-2 text-white"
        ></TEInput>
        <TEInput
          onChange={onFieldChange}
          name="price"
          type="number"
          label="Precio"
          value={formInputData.price}
          className="mb-6 text-white"
        ></TEInput>
        <TEInput
          onChange={onFieldChange}
          name="description"
          type="text"
          value={formInputData.description}
          label="Descripcion"
          className="mb-6 text-white"
        ></TEInput>

        <div className="relative flex flex-wrap items-stretch">
          <label
            className="flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]  text-white dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            htmlFor="inputGroupSelect01"
          >
            Categoria
          </label>
          <select
            name="type"
            onChange={onFieldChange}
            className="form-select focus:border-primary dark:focus:border-primary relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6]  text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            id="inputGroupSelect01"
          >
            <option className="text-white" value={formInputData.type}>
              {formInputData.type}
            </option>
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

        <div
          ref={thumbnailsDivRef}
          className="my-3 flex w-full  items-center justify-center overflow-x-scroll border-2 border-white p-3"
        >
          {updatedThumbnails.map((eachThumbnail) => (
            <img
              onClick={onImgClick}
              key={eachThumbnail}
              className="mx-2  w-[8vh] rounded-t-lg border border-white"
              src={eachThumbnail}
              alt="foto de la comida"
            />
          ))}
        </div>

        <TERipple rippleColor="light" className="w-full">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 mt-4 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Guardar cambios
          </button>
        </TERipple>
        <div className="flex justify-center">
          <TERipple>
            <button
              onClick={onDelete}
              type="button"
              className="mt-3 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Borrar
            </button>
          </TERipple>
        </div>
        <button
          type="button"
          className="bg-primary-100  text-primary-700 hover:bg-primary-accent-100 focus:bg-primary-accent-100 active:bg-primary-accent-200 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
          onClick={() => {
            handleDisplayModal(false);
            const images = Array.from(thumbnailsDivRef.current!.children);
            images.forEach((eachImg) => {
              eachImg.classList.remove("hidden");
            });
            setImgsToDelete([]);
          }}
        >
          Cerrar
        </button>
      </form>
      <div
        ref={deleteImgModalRef}
        className="fixed bottom-0 left-0 right-0 top-0 z-10 flex hidden h-full flex-col items-center justify-center bg-neutral-950 bg-opacity-90"
      >
        <div className="flex w-full justify-end pb-10">
          <button onClick={onCloseIconClick}>
            <img src={closeIcon} alt="" className="w-10" />
          </button>
        </div>

        <span className="mb-10 text-xl font-semibold text-white">
          ¿Desea borrar esta imagen?
        </span>
        <div className="mb-10 h-[30vh] w-[30vh]">
          <img ref={imgToBeDeletedRef} src="" alt="" />
        </div>

        <TERipple>
          <button
            onClick={onImgDelete}
            type="button"
            className="mt-3 inline-block rounded bg-red-600 px-8 pb-3 pt-4 text-xl  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Borrar
          </button>
        </TERipple>
      </div>
    </>
  );
}
