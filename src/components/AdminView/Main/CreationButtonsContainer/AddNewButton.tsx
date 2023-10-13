function AddNewButton({
  actionText,
  icon,
  modalData,
  handleModalData,
  handleDisplayModal,
}: {
  actionText: string;
  icon: string;
  modalData: ModalData;
  handleModalData(modalData: ModalData): void;
  handleDisplayModal(displayModal: boolean): void;
}) {
  return (
    <button
      onClick={() => {
        handleModalData(modalData);
        handleDisplayModal(true);
      }}
      type="button"
      className="no-taplight 
      my-3 flex items-center  justify-center rounded-full border-[1px]  border-gray-400
border-opacity-60 bg-categoriesBtn-bg px-8 
font-serif text-base
 font-bold uppercase leading-normal text-white
 
 transition
duration-150 ease-in-out focus:border-2
focus:border-card-border focus:text-card-border focus:shadow-[0_4px_9px_-4px_#8c3b35] focus:outline-none focus:ring-0"
    >
      <span>{actionText}</span>
      <img
        src={icon}
        alt="button that allows the creation of a new food"
        className="ml-3 w-9"
      />
    </button>
  );
}

export default AddNewButton;
