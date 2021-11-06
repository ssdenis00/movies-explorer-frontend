import { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  const [checkboxState, setCheckboxState] = useState(false);

  function handleToggleCheckbox() {
    setCheckboxState((state) => !state);
  }

  return (
    <div className="filter">
      <button
        onClick={handleToggleCheckbox}
        type="button"
        className={`filter__checkbox ${
          checkboxState ? "filter__checkbox_checked" : ""
        }`}
      >
        <span className="filter__checkbox-circle"></span>
      </button>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
