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
  const [formInputData, setFormInputData] = useState<FormData>(new FormData());
  const [inputData, setInputData] = useState<FoodData>({ ...foodToBeEdited });
  const [clearInput, setClearInput] = useState({ clear: false });
  console.log(inputData);
  const [files, setFiles] = useState<FileList | null>(null);
  const [foodThumbnails, setFoodThumbnails] = useState<string[]>(
    JSON.parse(foodToBeEdited.thumbnails),
  );
  const [types, setTypes] = useState<FoodTypeData[]>([]);
  const [fullUrlThumbnails, setFullUrlThumbnails] = useState<string[]>([]);
  const [imgsToDelete, setImgsToDelete] = useState<string[]>([]);
  const thumbnailsDivRef = useRef<HTMLDivElement>(null);
  const [
    imageToBeDeleteModalBeingDisplayed,
    setImageToBeDeleteModalBeingDisplayed,
  ] = useState<EventTarget & HTMLImageElement>();
  const deleteImgModalRef = useRef<HTMLDivElement>(null);
  const imgToBeDeletedRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let deleteConfirmationClicks = 0;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let notRemovedThumbnails;
    event.preventDefault();
    handleShowLoading(true);
    for (const eachImg of imgsToDelete) {
      await foodService.deleteImage(
        eachImg,
        foodToBeEdited.type,
        foodToBeEdited._id,
      );
    }

    if (imgsToDelete.length != 0) {
      notRemovedThumbnails = foodThumbnails.filter(
        (eachImg) => !imgsToDelete.includes(eachImg),
      );
    } else {
      notRemovedThumbnails = foodThumbnails;
    }

    formInputData.set("type", inputData.type);
    formInputData.set("name", inputData.name);
    formInputData.set("thumbnails", JSON.stringify(notRemovedThumbnails));
    formInputData.set("_id", inputData._id);
    formInputData.set("price", String(inputData.price));
    formInputData.set("description", inputData.description);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formInputData.append("thumbnailsFilesToUpdate", files[i]);
      }
    }

    await foodService.updateFood(formInputData);
    setFormInputData(new FormData());
    setFiles(null);
    fileInputRef.current!.value = "";
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
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      setFiles(files);
    } else {
      const { name, value } = event.target;
      if (!inputData.type || name == "type") {
        inputData.type = types[0].type;
      }
      setInputData({ ...inputData, [name]: value });
    }
  };
  const onDelete = async () => {
    deleteConfirmationClicks++;
    if (deleteConfirmationClicks == 1) {
      alert("Presione nuevamente borrar para confirmar");
    }
    if (deleteConfirmationClicks == 2) {
      handleShowLoading(true);
      await foodService.deleteFood(inputData._id);
      setFormInputData(new FormData());
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
    setInputData({ ...foodToBeEdited });
    setFoodThumbnails(JSON.parse(foodToBeEdited.thumbnails));
  }, [foodToBeEdited, clearInput]);
  useEffect(() => {
    console.log("thumnbails effect");
    const fullUrlThumbnails = foodThumbnails.map((imgName) => {
      return (
        import.meta.env.VITE_LO_DE_ALDI_API +
        "food/" +
        inputData.type +
        "/" +
        imgName
      );
    });
    setFullUrlThumbnails(fullUrlThumbnails);
  }, [foodThumbnails, inputData]);

  return (
    <>
      <div>
        {" "}
        <button
          type="button"
          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          onClick={() => {
            handleDisplayModal(false);
            setFormInputData(new FormData());
            setFiles(null);
            fileInputRef.current!.value = "";
            setClearInput({ clear: true });
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
          value={inputData.name}
          name="name"
          type="text"
          label="Nombre"
          className="mb-6 mt-2 text-white"
        ></TEInput>
        <TEInput
          onChange={onFieldChange}
          name="price"
          type="number"
          label="Precio"
          value={inputData.price}
          className="mb-6 text-white"
        ></TEInput>
        <TEInput
          onChange={onFieldChange}
          name="description"
          type="text"
          value={inputData.description}
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
            <option className="text-white" value={inputData.type}>
              {inputData.type}
            </option>
            {types.map((eachType) => {
              if (eachType.type != inputData.type) {
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
          {fullUrlThumbnails.map((eachThumbnail) => (
            <img
              onClick={onImgClick}
              key={eachThumbnail}
              className="mx-2  w-[8vh] rounded-t-lg border border-white"
              src={eachThumbnail}
              alt="foto de la comida"
            />
          ))}
        </div>
        <div className="mb-3 w-96">
          <label
            htmlFor="thumbnailsFilesToUpdate"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          ></label>
          <input
            name="thumbnailsFilesToUpdate"
            ref={fileInputRef}
            onChange={onFieldChange}
            className="focus:border-primary focus:shadow-te-primary dark:focus:border-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="thumbnailsFilesToUpdate"
            multiple
          />
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
            setFormInputData(new FormData());
            setFiles(null);
            setClearInput({ clear: true });
            fileInputRef.current!.value = "";
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
