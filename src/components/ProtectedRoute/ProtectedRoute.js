import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, path }) => {
  return <Route path={path}>{loggedIn ? children : <Redirect to="/" />}</Route>;
};

export default ProtectedRoute;
