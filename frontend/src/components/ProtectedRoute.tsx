import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
