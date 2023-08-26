import { useState, useEffect } from "react";
import { foodService } from "../../services";
export default function NavBar({ setClickedType }) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    async function getTypes() {
      const obtainedTypes = await foodService.getTypes();
      setTypes(obtainedTypes);
    }
    getTypes();
  }, []);
  return (
    <>
      <nav>
        <ul>
          <li>Combos</li>
          {types.map((eachType, index) => (
            <li key={index}>
              <button onClick={() => setClickedType(eachType.type)}>
                {eachType.type}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
