import { useEffect, useState } from "react";
import { Ripple, initTE } from "tw-elements";
import { foodTypeService } from "@/service";
import logo from "@assets/logo.png";
export default function NavBar({
  updateSelectedFoodType,
}: {
  updateSelectedFoodType(foodType: string): void;
}) {
  const [foodTypes, setFoodTypes] = useState<FoodTypeData[]>([]);
  /*  const [isLoading, setIsLoading] = useState(true); */
  const handleFoodTypeSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedFoodType = event.currentTarget.getAttribute("data-foodtype")!;
    console.log("re render nav");
    updateSelectedFoodType(selectedFoodType);
  };

  useEffect(() => {
    initTE({ Ripple });
  });

  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setFoodTypes(obtainedTypes);
      /* setIsLoading(false); */
    }
    getTypes();
  }, []);

  return (
    <>
      <div>
        <img src={logo} alt="" />
      </div>
      <nav className="overflow-x-scroll no-scrollbar">
        <div
          className="inline-flex  rounded-md 
          transition duration-150 ease-in-out 
          
          bg-categoriesBtn-bg"
          /* dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
           dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
           dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
           dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] */
          role="group"
        >
          {foodTypes.map((eachType) => (
            <button
              key={eachType._id}
              type="button"
              data-foodtype={eachType.type}
              onClick={(event) => {
                handleFoodTypeSelection(event);
              }}
              className="inline-block  bg-primary px-6 pb-2 pt-2.5 !bg-categoriesBtn-bg
            text-lg font-medium uppercase leading-normal text-white 
            transition duration-150 ease-in-out hover:!bg-categoriesBtn-bg 
            !focus:bg-categoriesBtn-bg  focus:outline-none focus:ring-0 active:bg-white focus:border-b-2 focus:border-card-border"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              {eachType.type}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
