import { useEffect, useState } from "react";
import { foodService } from "./services";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await foodService.getFoods({
          convertDataToString: true,
        });
        setData(responseData);
      } catch (error) {
        console.log(error.name, error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <h1>Data: {data}</h1>
      </div>
    </>
  );
}

export default App;
