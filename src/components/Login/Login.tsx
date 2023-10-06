import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validateAdmin from "@/hooks/useAuthAdmin";

import logo from "@assets/logo.png";
import foodIcon from "@assets/forkandknife-icon.svg";

export default function Login({ children }: { children: React.ReactNode }) {
  const [formInputData, setFormInputData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (response && response.status == 401) {
      setResponse(undefined);
      alert("Datos invalidos, intente nuevamente");
    }
  }, [response]);

  switch (response?.status) {
    case 200:
      return children;

    case 401:
      return (
        <div className="h-[80vh] flex flex-col justify-center items-center">
          <img src={logo} alt="" />
          <div
            className=" rounded-lg bg-body  w-fit flex items-center 
          shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
           dark:bg-neutral-700"
          >
            {isLoading ? (
              "cargando"
            ) : (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setIsLoading(true);
                  setResponse(
                    await validateAdmin(
                      formInputData.email,
                      formInputData.password
                    )
                  );
                  setIsLoading(false);
                }}
                className="px-8 py-16"
              >
                <TEInput
                  type="email"
                  name="email"
                  label="Correo"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormInputData({ ...formInputData!, [name]: value! });
                  }}
                >
                  <small
                    id="emailHelp"
                    className="absolute w-full text-neutral-500 dark:text-neutral-200"
                  ></small>
                </TEInput>

                <TEInput
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormInputData({ ...formInputData!, [name]: value! });
                  }}
                  name="password"
                  type="password"
                  label="Contraseña"
                  className="mt-12 mb-6"
                ></TEInput>

                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block  bg-body px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white 
                    shadow-[0_4px_9px_-4px_#3b71ca] 
                    transition duration-150 ease-in-out 
                    border-gray-400 border-[1px] rounded-full border-opacity-60
                    hover:bg-primary-600
                     hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                     focus:bg-primary-600 
                     focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                      focus:outline-none focus:ring-0 active:bg-primary-700 
                      active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                      dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
                      dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                      dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                      dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Identificarse
                  </button>
                </TERipple>
              </form>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-white flex flex-col justify-center items-center 
            border-2 border-card-border rounded-full
            p-6"
            >
              <p className="text-lg">
                Si has entrado por error, presiona aqui para volver al menu!
              </p>
              <img className="w-10" src={foodIcon} alt="" />
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-[80vh] flex flex-col justify-center items-center">
          <img src={logo} alt="" />
          <div
            className=" rounded-lg bg-body  w-fit flex items-center 
          shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
           dark:bg-neutral-700"
          >
            {isLoading ? (
              "cargando"
            ) : (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setIsLoading(true);
                  setResponse(
                    await validateAdmin(
                      formInputData.email,
                      formInputData.password
                    )
                  );
                  setIsLoading(false);
                }}
                className="px-8 py-16"
              >
                <TEInput
                  type="email"
                  name="email"
                  label="Correo"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormInputData({ ...formInputData!, [name]: value! });
                  }}
                >
                  <small
                    id="emailHelp"
                    className="absolute w-full text-neutral-500 dark:text-neutral-200"
                  ></small>
                </TEInput>

                <TEInput
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = event.target;
                    setFormInputData({ ...formInputData!, [name]: value! });
                  }}
                  name="password"
                  type="password"
                  label="Contraseña"
                  className="mt-12 mb-6"
                ></TEInput>

                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block  bg-body px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white 
                    shadow-[0_4px_9px_-4px_#3b71ca] 
                    transition duration-150 ease-in-out 
                    border-gray-400 border-[1px] rounded-full border-opacity-60
                    hover:bg-primary-600
                     hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                     focus:bg-primary-600 
                     focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                      focus:outline-none focus:ring-0 active:bg-primary-700 
                      active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                      dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
                      dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                      dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                      dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Identificarse
                  </button>
                </TERipple>
              </form>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-white flex flex-col justify-center items-center 
            border-2 border-card-border rounded-full
            p-6"
            >
              <p className="text-lg">
                Si has entrado por error, presiona aqui para volver al menu!
              </p>
              <img className="w-10" src={foodIcon} alt="" />
            </button>
          </div>
        </div>
      );
  }
}
