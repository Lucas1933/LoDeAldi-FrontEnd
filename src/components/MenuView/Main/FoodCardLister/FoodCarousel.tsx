import { useEffect, useRef, useState } from "react";

import slideLeftIcon from "@assets/slide-left-icon.svg";
import slideRightIcon from "@assets/slide-right-icon.svg";
import closeIcon from "@assets/close-icon.svg";

export default function FoodCarousel({
  setIsCarouselVisible,
  images,
}: {
  setIsCarouselVisible(isVisible: boolean): void;
  images: string[];
}) {
  const imgsContainer = useRef<HTMLDivElement>(null);
  const [imgs, setImgs] = useState<HTMLCollection>();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      event.preventDefault();
    });
    document.addEventListener("click", function (event) {
      const target = event.target as HTMLDivElement;
      if (target.id == "foodCarouselParentDiv") {
        setIsCarouselVisible(false);
      }
    });
  });

  useEffect(() => {
    setImgs(imgsContainer.current!.children);
  }, [images]);

  return (
    <>
      <div
        id="foodCarouselParentDiv"
        className="fixed bottom-0 left-0 right-0 top-0 z-10 my-10 flex h-full flex-col items-center justify-center bg-slate-950 bg-opacity-70"
      >
        <div className="flex w-full justify-between">
          <span className="ml-5 text-xl font-extrabold text-white">
            {imgs && currentImgIndex + 1 + "/" + imgs!.length}
          </span>

          <button className="mr-4" onClick={() => setIsCarouselVisible(false)}>
            <img className="w-14" src={closeIcon} alt="" />
          </button>
        </div>

        <div className="relative z-20 flex w-[50vh] justify-center">
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex w-full   flex-row-reverse items-center justify-between  ">
            <button
              className="h-full"
              onClick={() => {
                if (currentImgIndex + 1 == imgs!.length) {
                  imgs![currentImgIndex].classList.add("hidden");
                  imgs![0].classList.remove("hidden");
                  setCurrentImgIndex(0);
                } else {
                  imgs![currentImgIndex].classList.add("hidden");
                  imgs![currentImgIndex + 1].classList.remove("hidden");
                  setCurrentImgIndex(currentImgIndex + 1);
                }
              }}
            >
              <img className="w-14" src={slideRightIcon} alt="" />
            </button>
            <button
              className="h-full"
              onClick={() => {
                if (currentImgIndex - 1 < 0) {
                  imgs![currentImgIndex].classList.add("hidden");
                  imgs![imgs!.length - 1].classList.remove("hidden");
                  setCurrentImgIndex(imgs!.length - 1);
                } else {
                  imgs![currentImgIndex].classList.add("hidden");
                  imgs![currentImgIndex - 1].classList.remove("hidden");
                  setCurrentImgIndex(currentImgIndex - 1);
                }
              }}
            >
              <img className="w-14" src={slideLeftIcon} alt="" />
            </button>
          </div>
          <div ref={imgsContainer} className="w-[90%] ">
            {images.map((eachImg, index) => {
              if (index == 0) {
                return (
                  <img
                    key={eachImg}
                    className="max-h-full max-w-full rounded-lg px-2"
                    src={eachImg}
                    alt=""
                  />
                );
              }
              return (
                <img
                  key={eachImg}
                  className="hidden rounded-lg px-2"
                  src={eachImg}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
