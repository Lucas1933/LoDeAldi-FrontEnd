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
      <div className="flex justify-center items-center">
        <img className="w-[65%]" src={logo} alt="" />
      </div>
      {/*  <div className="flex flex-col justify-center">
        <div className="flex">
          <img src={delivery} className="w-20" alt="" />
          <img src={wspIcon} className="w-16" alt="" />
        </div>
        <span className="text-white">Delivery sin cargo!</span>
      </div> */}
      <div className="flex  justify-evenly items-end my-4">
        <div className="w-[40%] flex flex-col items-center">
          <img className="w-[60%] pb-3" src={delivery} alt="" />
          <span className="text-white">Envio sin cargo!</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-evenly">
            <img src={wspIcon} className="w-16 pb-6" alt="" />
            <span className="text-white ">Hace tu pedido!</span>
          </div>
        </div>
      </div>

      <h2 className="ml-3 text-white text-xl">Nuestras comidas!</h2>
      <nav className="overflow-x-scroll no-scrollbar">
        <ul
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
              <li className="">
                <button
                  key={eachType._id}
                  type="button"
                  data-foodtype={eachType.type}
                  onClick={(event) => {
                    handleFoodTypeSelection(event);
                    handleScrollIntoView(event);
                  }}
                  className="no-taplight inline-block font-serif my-3 mx-2  bg-primary px-6 pb-2 pt-2.5 !bg-categoriesBtn-bg
              text-lg font-bold uppercase leading-normal text-white border-gray-400 border-[1px] rounded-full border-opacity-60
              transition duration-150 ease-in-out hover:!bg-categoriesBtn-bg  
              !focus:bg-categoriesBtn-bg  focus:outline-none focus:ring-0 focus:text-card-border active:bg-white focus:border-2 focus:border-card-border"
                  data-te-ripple-init
                  data-te-ripple-color="white"
                >
                  {eachType.type}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
