import logo from "@assets/logo.png";
import delivery from "@assets/food_delivery_bike_icon_white.png";
import wspIcon from "@assets/whatsapp-color-svgrepo-com.svg";
import foodIcon from "@assets/forkandknife-icon.svg";
import clockIcon from "@assets/clock-icon.svg";
export default function Info() {
  return (
    <>
      <div className="flex items-center justify-center">
        <img className="w-[55%]" src={logo} alt="" />
      </div>
      <div className="flex items-center  justify-center ">
        <div className=" flex w-full flex-col items-center">
          <img className=" w-10 pb-3" src={delivery} alt="" />
          <span className="font-roboto font-normal text-white">
            Envio sin cargo!
          </span>
        </div>
        <div className="flex w-full flex-col items-center text-center font-roboto font-normal text-white">
          <p>Viernes a domingo</p>
          <img className="w-10" src={clockIcon} alt="" />
          <p>19:30 hasta 23:30</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <a href="https://wa.me/+541168963001">
            <div className="flex flex-col items-center justify-center">
              <img src={wspIcon} className="w-10 pb-3" alt="" />
              <span className="font-roboto  font-normal text-white ">
                Hace tu pedido!
              </span>
            </div>
          </a>
        </div>
      </div>
      <h2 className=" ml-3 flex items-center justify-start font-roboto text-xl font-bold italic text-white">
        <img className="my-2 mr-3 w-6" src={foodIcon} alt="" />
        <p>Nuestras comidas! </p>
      </h2>
    </>
  );
}
