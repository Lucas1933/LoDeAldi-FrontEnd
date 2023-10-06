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
      className="my-2 flex justify-between  border-b-2 border-gray-400
      border-opacity-40 bg-card-background py-2 text-lg font-medium 
      uppercase leading-normal text-white transition duration-150 ease-in-out"
    >
      <div className="flex w-[50%]">
        <div ref={placeholderDivImageLoading} className="animate-pulse">
          <span
            className="mx-2 inline-block h-28 w-28  flex-auto animate-pulse cursor-wait
  rounded-lg bg-current p-6 align-middle text-base
   text-neutral-700 opacity-50 dark:text-neutral-50"
          ></span>
        </div>
        <img
          ref={foodImg}
          src={updatedThumbnails[0]}
          onLoad={() => handleImageLoaded()}
          className="hidden w-max rounded-xl"
          alt=""
        />
      </div>
      <div className="ml-3 flex w-[60%]  flex-col justify-evenly text-white ">
        <p className="mb-1 mt-2  font-roboto text-xl font-light leading-tight ">
          {name}
        </p>
        <p className="mb-1  font-mono text-2xl font-medium leading-tight  text-money dark:text-neutral-50">
          ${price}
        </p>
        <p className="mb-1 font-roboto text-base font-thin lowercase italic">
          {description}
        </p>
      </div>
    </li>
  );
}
