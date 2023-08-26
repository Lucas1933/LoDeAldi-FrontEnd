import { useState, useEffect } from "react";
import { foodService } from "../../services";
export default function NavBar() {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    async function getTypes() {
      const types = await foodService.getTypes();
      const mappedTypes = types.map((eachType, index) => (
        <li key={index}>{eachType.type}</li>
      ));
      setTypes(mappedTypes);
    }
    getTypes();
  }, []);
  return (
    <>
      <nav>
        <ul>{types}</ul>
      </nav>
    </>
  );
}
