import "./FilterCheckbox.css";

function FilterCheckbox({ checkboxState, onClickCheckbox }) {
  return (
    <div className="filter">
      <button
        onClick={onClickCheckbox}
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
