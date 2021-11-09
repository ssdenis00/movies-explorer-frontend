import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, path }) => {
  return (
    <Route path={path}>{loggedIn ? children : <Redirect to="/signin" />}</Route>
  );
};

export default ProtectedRoute;
