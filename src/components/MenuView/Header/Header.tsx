import NavBar from "./NavBar";

import logo from "@assets/logo.png";
import delivery from "@assets/food_delivery_bike_icon_white.png";
import wspIcon from "@assets/whatsapp-color-svgrepo-com.svg";

export default function Header({
  updateSelectedFoodType,
}: {
  updateSelectedFoodType(foodType: string): void;
}) {
  return (
    <header>
      <div className="flex justify-center items-center">
        <img className="w-[65%]" src={logo} alt="" />
      </div>
      <div className="flex  justify-evenly items-end my-4">
        <div className="w-[40%] flex flex-col items-center">
          <img className="w-[60%] pb-3" src={delivery} alt="" />
          <span className="text-white">Envio sin cargo!</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-evenly">
            <img src={wspIcon} className="w-16 pb-6" alt="" />
            <span className="text-white ">Hace tu pedido!</span>
          </div>
        </div>
      </div>
      <h2 className="ml-3 text-white text-xl">Nuestras comidas!</h2>
      <NavBar updateSelectedFoodType={updateSelectedFoodType} />
    </header>
  );
}
