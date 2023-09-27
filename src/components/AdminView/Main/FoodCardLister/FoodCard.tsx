import { TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";
function FoodCard({
  food,
  handleDisplayModal,
  handleModalData,
}: {
  food: FoodData;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
}) {
  const { name, price, description, thumbnails, type } = food;
  const [updatedThumbnails, setUpdatedThumbnails] = useState([""]);
  useEffect(() => {
    const updatedThumbnails = thumbnails.map((thumbnail) => {
      return (
        import.meta.env.VITE_LO_DE_ALDI_API + "food/" + type + "/" + thumbnail
      );
    });
    setUpdatedThumbnails(updatedThumbnails);
  }, [thumbnails, type]);

  return (
    <li className="block m-3 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border-solid border-blue-500 border-2 ">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {name}
      </h5>
      <h5 className="mb-2 text-xl font-medium leading-tight  text-green-800 dark:text-neutral-50">
        ${price}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {description}
      </p>
      <div>
        <div className="flex mb-4">
          {updatedThumbnails.map((eachThumbnail) => (
            <img
              key={eachThumbnail}
              className="rounded-t-lg w-[15vh]"
              src={eachThumbnail}
              alt="foto de la comida"
            />
          ))}
        </div>
      </div>
      <TERipple>
        <button
          onClick={() => {
            handleModalData({
              foodToBeEdited: food,
            });
            handleDisplayModal(true);
          }}
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Editar
        </button>
      </TERipple>
    </li>
  );
}
export default FoodCard;
