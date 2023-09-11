import { useEffect, useState, memo } from "react";
import { Collapse, Dropdown, initTE } from "tw-elements";
import { foodTypeService } from "@/service";

function NavBar({ updateSelectedFoodType, updateSelectedType }: NavBarProps) {
  console.log("navbar rendered");
  const [foodTypes, setFoodTypes] = useState<FoodTypeData[]>([]);
  const handleFoodTypeSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedFoodType = event.currentTarget.getAttribute("data-foodtype")!;
    updateSelectedFoodType(selectedFoodType);
  };

  useEffect(() => {
    initTE({ Collapse, Dropdown });
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setFoodTypes(obtainedTypes);
    }
    getTypes();
  }, []);

  return (
    <header>
      {/* <!-- Main navigation container --> */}
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          {/* <!-- Hamburger button for mobile view --> */}
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:!hidden "
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent5"
            aria-controls="navbarSupportedContent5"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <!-- Hamburger icon --> */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {/*   <!-- Collapsible navbar container --> */}
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent5"
            data-te-collapse-item
          >
            <ul className="lg:flex lg:justify-center lg:w-fit">
              {foodTypes.map((eachType) => (
                <li
                  key={eachType._id}
                  /* className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50" */
                  className="mb-4 pl-2 lg:mx-5 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <button
                    onClick={(event) => {
                      handleFoodTypeSelection(event);
                      updateSelectedType(false);
                    }}
                    data-foodtype={eachType.type}
                    className="p-0 text-neutral-950 transition duration-200 hover:text-neutral-400 hover:ease-in-out focus:text-neutral-400 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    data-te-nav-link-ref
                  >
                    {eachType.type}
                  </button>
                </li>
              ))}
              <li
                /* className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50" */
                className="mb-4 pl-2 lg:mx-5 lg:mb-0 lg:pl-0 lg:pr-1"
                data-te-nav-item-ref
              >
                <button
                  onClick={() => updateSelectedType(true)}
                  className="p-0 text-neutral-950 transition duration-200 hover:text-neutral-400 hover:ease-in-out focus:text-neutral-400 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  data-te-nav-link-ref
                >
                  Categorias
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export const memoizedNavBar = memo(NavBar);
