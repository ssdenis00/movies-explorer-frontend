import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <button
        type="button"
        className="filter__checkbox filter__checkbox_checked"
      >
        <span className="filter__checkbox-circle"></span>
      </button>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
