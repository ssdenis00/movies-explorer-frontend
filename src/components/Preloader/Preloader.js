import "./Preloader.css";

const Preloader = ({ state }) => {
  return (
    <div className={`preloader ${state ? "preloader_active" : ""}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
