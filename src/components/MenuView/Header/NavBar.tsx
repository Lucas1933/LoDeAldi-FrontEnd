import { useEffect, useState } from "react";
import { Ripple, initTE } from "tw-elements";
import { foodTypeService } from "@/service";

import milanesaIcon from "@assets/milanga.png";
import pizzaIcon from "@assets/pizza-icon.svg";
import burgerIcon from "@assets/burgerIcon.svg";
import fritasIcon from "@assets/fritas-icon.svg";
import comboIcon from "@assets/combo-icon.png";
export default function NavBar({
  updateSelectedFoodType,
}: {
  updateSelectedFoodType(foodType: string): void;
}) {
  const [foodTypes, setFoodTypes] = useState<FoodTypeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [btnsIcons, setBtnsIcons] = useState<{
    [key: string]: string;
  }>({});
  const [iconSize, setIconSize] = useState<{
    [key: string]: string;
  }>({});

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
      const index = obtainedTypes.findIndex(
        (eachFoodType) => eachFoodType.type == "Combo"
      );
      if (index !== -1) {
        const comboType = obtainedTypes[index];
        obtainedTypes.splice(index, 1);
        obtainedTypes.unshift(comboType);
      }
      setFoodTypes(obtainedTypes);
      setIsLoading(false);
    }
    getTypes();
  }, []);
  useEffect(() => {
    setBtnsIcons({
      Pizza: pizzaIcon,
      Milanesa: milanesaIcon,
      Burger: burgerIcon,
      Frita: fritasIcon,
      Combo: comboIcon,
    });
    setIconSize({
      Pizza: ["w-12", "h-11"].join(" "),
      Milanesa: ["w-12", "h-10"].join(" "),
      Burger: ["w-10", "h-10"].join(" "),
      Frita: ["w-12", "h-10"].join(" "),
      Combo: ["w-12", "h-10"].join(" "),
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <p className=" animate-pulse flex mt-5">
          <span
            className="inline-block mx-2 rounded-full  h-10 w-20 p-6
          flex-auto cursor-wait bg-current align-middle text-base
           text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
          <span
            className="inline-block rounded-full mx-2 h-10 w-20 p-6
          flex-auto cursor-wait bg-current align-middle text-base
           text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
          <span
            className="inline-block rounded-full mx-2 h-10 w-20 p-6
          flex-auto cursor-wait bg-current align-middle text-base
           text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
        </p>
      ) : (
        <nav className="overflow-x-scroll no-scrollbar">
          <ul
            className="inline-flex justify-center items-center rounded-md 
          transition duration-150 ease-in-out 
          bg-categoriesBtn-bg"
            role="group"
          >
            {foodTypes.map((eachType) => {
              return (
                <li key={eachType._id} className="flex-1">
                  <button
                    type="button"
                    data-foodtype={eachType.type}
                    onClick={(event) => {
                      handleFoodTypeSelection(event);
                      handleScrollIntoView(event);
                    }}
                    className="no-taplight   justify-center 
                    items-center flex font-serif my-3 mx-2 px-8  bg-categoriesBtn-bg
              text-base font-bold uppercase 
              leading-normal text-white
               border-gray-400 border-[1px] rounded-full border-opacity-60
               shadow-[0_4px_9px_-4px_#3b71ca] 
               focus:shadow-[0_4px_9px_-4px_#8c3b35]
              transition duration-150 ease-in-out
              focus:outline-none focus:ring-0 focus:text-card-border focus:border-2 focus:border-card-border"
                    data-te-ripple-init
                    data-te-ripple-color="white"
                  >
                    <img
                      src={btnsIcons[eachType.type]}
                      className={iconSize[eachType.type] + " " + "mr-2"}
                      alt=""
                    />
                    <span>{eachType.type}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
