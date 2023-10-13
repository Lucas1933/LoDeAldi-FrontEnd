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
    <li
      className="my-2 flex flex-col items-center border-b-2 border-gray-400
    border-opacity-40 bg-card-background py-2 text-lg font-medium 
    uppercase leading-normal text-white transition duration-150 ease-in-out"
    >
      <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
        {name}
      </h5>
      <h5 className="mb-2 text-xl font-medium leading-tight  text-money dark:text-neutral-50">
        ${price}
      </h5>
      <p className="mb-4 text-base text-neutral-500 dark:text-neutral-200">
        {description}
      </p>
      <div>
        <div className="mb-4 flex">
          {updatedThumbnails.map((eachThumbnail) => (
            <img
              key={eachThumbnail}
              className="w-[15vh] rounded-t-lg"
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
          className="no-taplight   mx-2  my-3
          flex w-full items-center justify-center rounded-full border-[1px]  border-gray-400
    border-opacity-60 bg-categoriesBtn-bg px-8 
    font-serif text-base
     font-bold uppercase leading-normal text-white
     
     transition
    duration-150 ease-in-out focus:border-2
    focus:border-card-border focus:text-card-border focus:shadow-[0_4px_9px_-4px_#8c3b35] focus:outline-none focus:ring-0"
        >
          Editar
        </button>
      </TERipple>
    </li>
  );
}
export default FoodCard;
