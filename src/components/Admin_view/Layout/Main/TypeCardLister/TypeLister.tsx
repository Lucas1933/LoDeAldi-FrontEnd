import useDisplayFoodTypes from "@hooks/use_display_food_types";
import TypeCard from "./TypeCard";
function TypeLister({ handleDisplayModal, handleModalData }: TypeListerProps) {
  const types = useDisplayFoodTypes();
  return (
    <>
      <ul>
        {types.map((eachType) => (
          <TypeCard
            key={eachType._id}
            typeProp={eachType}
            handleDisplayModal={handleDisplayModal}
            handleModalData={handleModalData}
          />
        ))}
      </ul>
    </>
  );
}

export default TypeLister;
