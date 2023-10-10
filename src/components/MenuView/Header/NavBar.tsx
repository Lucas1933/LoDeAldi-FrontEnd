import { useEffect, useState, memo } from "react";
import { Ripple, initTE } from "tw-elements";
import { foodTypeService } from "@/service";

import milanesaIcon from "@assets/milanga.png";
import pizzaIcon from "@assets/pizza-icon.svg";
import burgerIcon from "@assets/burgerIcon.svg";
import fritasIcon from "@assets/fritas-icon.svg";
import comboIcon from "@assets/combo-icon.png";

const NavBar = memo(function NavBar({
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
    event: React.MouseEvent<HTMLButtonElement>,
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
        (eachFoodType) => eachFoodType.type == "Combo",
      );
      const comboType = obtainedTypes[index];
      obtainedTypes.splice(index, 1);
      obtainedTypes.unshift(comboType);
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
        <p className=" mt-5 flex animate-pulse">
          <span
            className="mx-2 inline-block h-10  w-20 flex-auto cursor-wait
          rounded-full bg-current p-6 align-middle text-base
           text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
          <span
            className="mx-2 inline-block h-10 w-20 flex-auto cursor-wait
          rounded-full bg-current p-6 align-middle text-base
           text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
          <span
            className="mx-2 inline-block h-10 w-20 flex-auto cursor-wait
          rounded-full bg-current p-6 align-middle text-base
           text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
        </p>
      ) : (
        <nav className="no-scrollbar overflow-x-scroll">
          <ul
            className="inline-flex items-center justify-center rounded-md 
          bg-categoriesBtn-bg transition duration-150 
          ease-in-out"
            role="group"
          >
            {foodTypes.map((eachType) => {
              return (
                <li key={eachType._id} className="flex-1">
                  <button
                    autoFocus={eachType.type == "Combo" ? true : false}
                    type="button"
                    data-foodtype={eachType.type}
                    onClick={(event) => {
                      handleFoodTypeSelection(event);
                      handleScrollIntoView(event);
                    }}
                    className="no-taplight   mx-2 
                    my-3 flex items-center justify-center rounded-full border-[1px]  border-gray-400
              border-opacity-60 bg-categoriesBtn-bg px-8 
              font-serif text-base
               font-bold uppercase leading-normal text-white
               shadow-[0_4px_9px_-4px_#3b71ca] 
               transition
              duration-150 ease-in-out focus:border-2
              focus:border-card-border focus:text-card-border focus:shadow-[0_4px_9px_-4px_#8c3b35] focus:outline-none focus:ring-0"
                    data-te-ripple-init
                    data-te-ripple-centered="true"
                    data-te-class-wave="rounded-[50%]  pointer-events-none absolute touch-none scale-0 transition-[transform,_opacity] ease-[cubic-bezier(0,0,0.15,1),_cubic-bezier(0,0,0.15,1)] z-[999]"
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
});
export default NavBar;
