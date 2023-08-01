import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  if (email === undefined && password === undefined) {
    return <Navigate to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
