import { TERipple } from "tw-elements-react";

function TypeCard({
  typeProp,
  handleDisplayModal,
  handleModalData,
}: {
  typeProp: FoodTypeData;
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
}) {
  const { type } = typeProp;
  return (
    <li
      className="my-2 flex flex-col items-center border-b-2 border-gray-400 border-opacity-40
    bg-card-background px-3 py-2 text-lg font-medium 
    uppercase leading-normal text-white transition duration-150 ease-in-out"
    >
      <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
        {type}
      </h5>
      <TERipple>
        <button
          onClick={() => {
            handleModalData({
              foodTypeToBeEdited: typeProp,
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
export default TypeCard;
