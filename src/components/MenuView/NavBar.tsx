import { useEffect, useState } from "react";
import { Ripple, initTE } from "tw-elements";
import { foodTypeService } from "@/service";
import logo from "@assets/logo.png";
import delivery from "@assets/food_delivery_bike_icon_white.png";
import wspIcon from "@assets/whatsapp-color-svgrepo-com.svg";
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
    updateSelectedFoodType(selectedFoodType);
  };
  const handleScrollIntoView = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  useEffect(() => {
    initTE({ Ripple });
  });

  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setFoodTypes(obtainedTypes);
    }
    getTypes();
  }, []);

  return (
    <>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex">
          <img src={delivery} className="w-20" alt="" />
          <img src={wspIcon} className="w-16" alt="" />
        </div>
        <span className="text-white">Delivery sin cargo!</span>
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
          {foodTypes.map((eachType) => {
            return (
              <button
                key={eachType._id}
                type="button"
                data-foodtype={eachType.type}
                onClick={(event) => {
                  handleFoodTypeSelection(event);
                  handleScrollIntoView(event);
                }}
                className="inline-block font-serif  bg-primary px-6 pb-2 pt-2.5 !bg-categoriesBtn-bg
                text-lg font-bold uppercase leading-normal text-white border-gray-400 border-2 rounded-t-lg border-opacity-60
                transition duration-150 ease-in-out hover:!bg-categoriesBtn-bg  
                !focus:bg-categoriesBtn-bg  focus:outline-none focus:ring-0 active:bg-white focus:border-2 focus:border-card-border"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                {eachType.type}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
