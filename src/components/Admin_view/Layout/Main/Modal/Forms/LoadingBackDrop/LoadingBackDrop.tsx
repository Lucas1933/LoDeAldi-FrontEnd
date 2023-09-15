import loadingIcon from "@assets/loading_icon.svg";
export default function LoadingBackDrop({
  loadingText,
}: {
  loadingText: string;
}) {
  return (
    <div className="absolute flex justify-center items-center opacity-90 top-0 bottom-0 right-0 left-0 bg-black w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <img
          className="animate-spin w-14"
          src={loadingIcon}
          alt="loading icon"
        />
        <span className="text-lg font-bold text-blue-800">{loadingText}</span>
      </div>
    </div>
  );
}
