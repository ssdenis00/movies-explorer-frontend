import { Link } from "react-router-dom";

import "./Logo.css";

function Logo({ modifier }) {
  return <Link to="/" className={`logo ${modifier}`}></Link>;
}

export default Logo;
