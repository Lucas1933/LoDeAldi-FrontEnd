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
      className="flex justify-between border-b-2 bg-black mt-2
      text-lg font-medium uppercase leading-normal text-white 
      transition duration-150 ease-in-out border-card-border "
    >
      <div className="flex justify-center items-center w-[50%] p-3 ">
        <img
          className="w-[100%] rounded-full"
          src={updatedThumbnails[0]}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-evenly w-[60%] text-white ">
        <h5 className="mb-2 text-xl font-medium leading-tight ">{name}</h5>
        <h5 className="mb-2 text-xl font-medium leading-tight  text-money dark:text-neutral-50">
          ${price}
        </h5>
        <p className="mb-4 text-base ">{description}</p>
      </div>
    </li>
  );
}
