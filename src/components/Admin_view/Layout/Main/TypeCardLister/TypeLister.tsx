import { useEffect, useState } from "react";
import { foodTypeService } from "@/service";
import TypeCard from "./TypeCard";
function TypeLister({
  handleDisplayModal,
  handleModalData,
  isResourceChanged,
}: {
  handleDisplayModal(displayModal: boolean): void;
  handleModalData(modalData: ModalData): void;
  isResourceChanged: { hasChanged: boolean };
}) {
  const [types, setTypes] = useState<FoodTypeData[]>([]);
  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setTypes(obtainedTypes);
    }
    getTypes();
  }, [isResourceChanged]);
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
