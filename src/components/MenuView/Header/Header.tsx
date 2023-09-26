import NavBar from "./NavBar";

import logo from "@assets/logo.png";
import delivery from "@assets/food_delivery_bike_icon_white.png";
import wspIcon from "@assets/whatsapp-color-svgrepo-com.svg";
import foodIcon from "@assets/forkandknife-icon.svg";
import clockIcon from "@assets/clock-icon.svg";

export default function Header({
  updateSelectedFoodType,
}: {
  updateSelectedFoodType(foodType: string): void;
}) {
  return (
    <header>
      <div className="flex justify-center items-center">
        <img className="w-[55%]" src={logo} alt="" />
      </div>

      <div className="flex justify-center  items-center ">
        <div className=" flex w-full flex-col items-center">
          <img className=" pb-3 w-10" src={delivery} alt="" />
          <span className="text-white font-roboto font-normal">
            Envio sin cargo!
          </span>
        </div>
        <div className="flex text-white font-roboto font-normal text-center w-full flex-col items-center">
          <p>Viernes a domingo</p>
          <img className="w-10" src={clockIcon} alt="" />
          <p>19:30 hasta 23:30</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <a href="https://wa.me/+541168963001">
            <div className="flex flex-col items-center justify-center">
              <img src={wspIcon} className="w-10 pb-3" alt="" />
              <span className="text-white  font-roboto font-normal ">
                Hace tu pedido!
              </span>
            </div>
          </a>
        </div>
      </div>

      <h2 className=" ml-3 text-white font-bold font-roboto italic text-xl flex justify-start items-center">
        <img className="w-6 mr-3 my-2" src={foodIcon} alt="" />
        <p>Nuestras comidas! </p>
      </h2>
      <NavBar updateSelectedFoodType={updateSelectedFoodType} />
    </header>
  );
}
