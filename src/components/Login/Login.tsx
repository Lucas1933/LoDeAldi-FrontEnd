import { TEInput, TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validateAdmin from "@/hooks/useAuthAdmin";

import logo from "@assets/logo.png";
import foodIcon from "@assets/forkandknife-icon.svg";
import loadingIcon from "@assets/loading_icon.svg";

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
      setTimeout(() => {}, 3000);
      setResponse(undefined);
      alert("Datos invalidos, intente nuevamente");
    }
  }, [response]);

  switch (response?.status) {
    case 200:
      return children;

    default:
      return (
        <div className="flex h-[80vh] flex-col items-center justify-center">
          <img src={logo} alt="" />
          <div
            className=" flex w-fit  items-center rounded-lg bg-body 
          shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
           dark:bg-neutral-700"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-bold italic text-white">
                  Cargando...
                </span>
                <img className="w-16 animate-spin" src={loadingIcon} alt="" />
              </div>
            ) : (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  setIsLoading(true);
                  setResponse(
                    await validateAdmin(
                      formInputData.email,
                      formInputData.password,
                    ),
                  );
                  setIsLoading(false);
                }}
                className="px-8 py-16"
              >
                <TEInput
                  type="email"
                  name="email"
                  theme={{
                    input:
                      "peer text-white block min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none placeholder:opacity-0 disabled:bg-neutral-100 read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary	",
                  }}
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
                  theme={{
                    input:
                      "peer text-white block min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none placeholder:opacity-0 disabled:bg-neutral-100 read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary	",
                  }}
                  name="password"
                  type="password"
                  label="Contraseña"
                  className="mb-6 mt-12"
                ></TEInput>

                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="hover:bg-primary-600  focus:bg-primary-600 active:bg-primary-700 inline-block rounded-full border-[1px] border-gray-400 border-opacity-60 bg-body px-6 
                    pb-2 
                    pt-2.5 text-xs font-medium 
                    uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]
                    transition
                     duration-150 
                     ease-in-out 
                     hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                      focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
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
              className="flex flex-col items-center justify-center rounded-full 
            border-2 border-card-border p-6
            text-white"
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
