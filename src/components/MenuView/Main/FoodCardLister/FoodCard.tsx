import { useEffect, useRef, useState } from "react";
import FoodCarousel from "./FoodCarousel";
export default function FoodCard({ food }: { food: FoodData }) {
  const { name, price, description, thumbnails, type } = food;
  const [updatedThumbnails, setUpdatedThumbnails] = useState([""]);
  const placeholderDivImageLoading = useRef<HTMLDivElement>(null);
  const foodImg = useRef<HTMLImageElement>(null);

  const handleImageLoaded = () => {
    placeholderDivImageLoading.current!.classList.add("hidden");
    foodImg.current?.classList.remove("hidden");
  };
  useEffect(() => {
    const updatedThumbnails = thumbnails.map((thumbnail) => {
      return (
        import.meta.env.VITE_LO_DE_ALDI_API + "food/" + type + "/" + thumbnail
      );
    });
    setUpdatedThumbnails(updatedThumbnails);
  }, [thumbnails, type]);
  return (
    <li
      className="flex justify-between border-b-2  bg-card-background my-2
      text-lg font-medium uppercase leading-normal text-white 
      transition duration-150 ease-in-out border-gray-400 border-opacity-40 py-2"
    >
      <div className="flex w-[50%]">
        <div ref={placeholderDivImageLoading} className="animate-pulse">
          <span
            className="inline-block animate-pulse mx-2 rounded-lg  h-28 w-28 p-6
  flex-auto cursor-wait bg-current align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
        </div>
        <img
          ref={foodImg}
          src={updatedThumbnails[0]}
          onLoad={() => handleImageLoaded()}
          className="w-max rounded-xl hidden"
          alt=""
        />
      </div>
      <div className="flex ml-3 flex-col  justify-evenly w-[60%] text-white ">
        <p className="mb-1 text-xl  leading-tight mt-2 font-roboto font-light ">
          {name}
        </p>
        <p className="mb-1  text-2xl font-medium font-mono leading-tight  text-money dark:text-neutral-50">
          ${price}
        </p>
        <p className="mb-1 text-base lowercase font-roboto italic font-thin">
          {description}
        </p>
      </div>
    </li>
  );
}
