import { useState, useEffect } from "react";
import { foodService } from "../../../services/index";
import PropTypes from "prop-types";
export default function NavBar({ setClickedType }) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    /* obtain and set the types */
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
          {/* for each type create a li with a btn inside that would give to the parent AdminPage the type selected */}
          {types.map((eachType, index) => (
            <li key={index}>
              <button
                onClick={() => setClickedType(eachType.type)}
                className="border-solid border-4 border-black"
              >
                {eachType.type}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
NavBar.propTypes = {
  setClickedType: PropTypes.func,
};
