import { useEffect } from "react";

import { Collapse, Dropdown, initTE } from "tw-elements";

function Nav({ updateSelectedFoodType, foodTypes }: NavProps) {
  const handleFoodTypeSelection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedFoodType = event.currentTarget.getAttribute("data-foodtype")!;
    updateSelectedFoodType(selectedFoodType);
  };

  useEffect(() => {
    initTE({ Collapse, Dropdown });
  }, []);
  return (
    <>
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
                    onClick={handleFoodTypeSelection}
                    data-foodtype={eachType.type}
                    className="p-0 text-neutral-950 transition duration-200 hover:text-neutral-400 hover:ease-in-out focus:text-neutral-400 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    data-te-nav-link-ref
                  >
                    {eachType.type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* <nav>
        <div id="accordionExample">
          <div classNameName="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
            <h2 classNameName="mb-0" id="headingOne">
              <button
                classNameName={`${
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
                  classNameName={`${
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
                    classNameName="h-6 w-6"
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
              classNameName="!mt-0 !rounded-b-none !shadow-none"
            >
              <ul classNameName="w-96">{buttonsType}</ul>
            </TECollapse>
          </div>
        </div>
      </nav> */}
    </>
  );
}
export default Nav;
