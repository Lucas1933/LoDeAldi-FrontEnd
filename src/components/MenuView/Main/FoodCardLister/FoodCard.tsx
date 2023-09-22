import { useEffect, useState } from "react";

export default function FoodCard({ food }: { food: FoodData }) {
  const { name, price, description, thumbnails, type } = food;
  const [updatedThumbnails, setUpdatedThumbnails] = useState([""]);

  useEffect(() => {
    const updatedThumbnails = thumbnails.map((thumbnail) => {
      return (
        import.meta.env.VITE_LO_DE_ALDI_API + "food/" + type + "/" + thumbnail
      );
    });
    setUpdatedThumbnails(updatedThumbnails);
  }, [thumbnails, type]);
  /*  m-3 flex  justify-between rounded-lg bg-white  
    shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
     dark:bg-neutral-700 border-solid border-blue-500 border-2 " */
  return (
    <li
      className="flex justify-between border-2 rounded-xl bg-card-background m-2
      text-lg font-medium uppercase leading-normal text-white 
      transition duration-150 ease-in-out border-card-border "
    >
      <div className="flex w-[50%] ">
        <img src={updatedThumbnails[0]} className="w-max" alt="" />
      </div>
      <div className="flex ml-3 flex-col justify-evenly w-[60%] text-white ">
        <h5 className="mb-1 text-xl font-medium leading-tight mt-2 ">{name}</h5>
        <h5 className="mb-1  text-xl font-medium leading-tight  text-money dark:text-neutral-50">
          ${price}
        </h5>
        <p className="mb-1 text-base ">{description}</p>
      </div>
    </li>
  );
}
