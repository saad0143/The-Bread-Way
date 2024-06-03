import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { allProducts } = useSelector((state) => state.product);



  if (!allProducts) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
