import PropTypes from "prop-types";
export default function EditButton({
  handleOpenModal,
  setFoodToBeEdited,
  foodInfo,
}) {
  return (
    <>
      <button
        onClick={() => {
          setFoodToBeEdited(foodInfo);
          handleOpenModal();
        }}
      >
        Editar
      </button>
    </>
  );
}
EditButton.propTypes = {
  foodInfo: PropTypes.object,
  setFoodToBeEdited: PropTypes.func,
  handleOpenModal: PropTypes.func,
};
