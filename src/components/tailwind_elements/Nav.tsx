import { TECollapse } from "tw-elements-react";
import { useState } from "react";
import { FoodTypeData } from "../../service/food_type_service";
interface NavProps {
  updateSelectedFoodType(foodType: string): void;
  foodTypes: FoodTypeData[];
}
function Nav({ updateSelectedFoodType, foodTypes }: NavProps) {
  const [activeElement, setActiveElement] = useState("");
  const handleClick = (value: string) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  const handleFoodTypeSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedFoodType = event.currentTarget.getAttribute("data-foodtype")!;
    updateSelectedFoodType(selectedFoodType);
  };

  const buttonsType = foodTypes.map((eachType) => (
    <li
      key={eachType._id}
      className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50"
    >
      <button onClick={handleFoodTypeSelection} data-foodtype={eachType.type}>
        {eachType.type}
      </button>
    </li>
  ));

  return (
    <>
      <nav>
        <div id="accordionExample">
          <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 className="mb-0" id="headingOne">
              <button
                className={`${
                  activeElement === "element1" &&
                  `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                type="button"
                onClick={() => handleClick("element1")}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Menu
                <span
                  className={`${
                    activeElement === "element1"
                      ? `rotate-[-180deg] -mr-1`
                      : `rotate-0 fill-[#212529]  dark:fill-white`
                  } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
            </h2>
            <TECollapse
              show={activeElement === "element1"}
              className="!mt-0 !rounded-b-none !shadow-none"
            >
              <ul className="w-96">{buttonsType}</ul>
            </TECollapse>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;
