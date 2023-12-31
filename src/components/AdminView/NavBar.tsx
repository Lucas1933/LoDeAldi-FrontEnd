import { useEffect, useState } from "react";
import { Collapse, Dropdown, initTE } from "tw-elements";
import { foodTypeService } from "@/service";
import logo from "@assets/logo.png";
export default function NavBar({
  updateSelectedFoodType,
  updateSelectedType,
}: {
  updateSelectedFoodType(foodType: string): void;
  updateSelectedType(displayTypes: boolean): void;
}) {
  const [foodTypes, setFoodTypes] = useState<FoodTypeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleFoodTypeSelection = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const selectedFoodType = event.currentTarget.getAttribute("data-foodtype")!;

    updateSelectedFoodType(selectedFoodType);
  };

  useEffect(() => {
    initTE({ Collapse, Dropdown });
  });

  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodTypeService.getFoodTypes();
      setFoodTypes(obtainedTypes);
      setIsLoading(false);
    }
    getTypes();
  }, []);

  return (
    <header>
      {isLoading ? (
        <div className="flex w-[20vh] items-center lg:w-full">
          <div className="w-full">
            <p className="animate-pulse">
              <span className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 "></span>
            </p>
            <p className="animate-pulse">
              <span className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 "></span>
            </p>
            <p className="animate-pulse">
              <span className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-current align-middle text-base text-neutral-700 opacity-50 "></span>
            </p>
          </div>
          <p className="lg:hidden">Cargando...</p>
        </div>
      ) : (
        <nav
          className="relative flex w-full flex-nowrap items-center justify-between bg-body py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700  lg:flex-wrap lg:justify-start lg:py-4"
          data-te-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            {/* <!-- Hamburger button for mobile view --> */}
            <button
              className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0  lg:!hidden "
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContent5"
              aria-controls="navbarSupportedContent5"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <!-- Hamburger icon --> */}
              <span className="[&>svg]:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10"
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
              <ul className="lg:flex lg:w-fit lg:justify-center">
                {foodTypes.map((eachType) => (
                  <li
                    key={eachType._id}
                    className="mx-4  mb-4 pl-2 font-bold lg:mx-5 lg:mb-0 lg:pl-0 lg:pr-1"
                    data-te-nav-item-ref
                  >
                    <button
                      onClick={(event) => {
                        handleFoodTypeSelection(event);
                        updateSelectedType(false);
                      }}
                      data-foodtype={eachType.type}
                      className="no-taplight   mx-2  my-3
                      flex w-full items-center justify-center rounded-full border-[1px]  border-gray-400
                border-opacity-60 bg-categoriesBtn-bg px-8 
                font-serif text-base
                 font-bold uppercase leading-normal text-white
                
                 transition
                duration-150 ease-in-out focus:border-2
                focus:border-card-border focus:text-card-border focus:shadow-[0_4px_9px_-4px_#8c3b35] focus:outline-none focus:ring-0"
                      data-te-nav-link-ref
                    >
                      <span>{eachType.type}</span>
                    </button>
                  </li>
                ))}
                <li
                  className="mx-4 mb-4  pl-2 font-bold lg:mx-5 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <button
                    onClick={() => updateSelectedType(true)}
                    className="no-taplight   mx-2  my-3
                    flex w-full items-center justify-center rounded-full border-[1px]  border-gray-400
              border-opacity-60 bg-categoriesBtn-bg px-8 
              font-serif text-base
               font-bold uppercase leading-normal text-white
               
               transition
              duration-150 ease-in-out focus:border-2
              focus:border-card-border focus:text-card-border focus:shadow-[0_4px_9px_-4px_#8c3b35] focus:outline-none focus:ring-0"
                    data-te-nav-link-ref
                  >
                    Categorias
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-[70%] lg:hidden">
            <img className="w-[20vh]" src={logo} alt="logo" />
          </div>
        </nav>
      )}
    </header>
  );
}
