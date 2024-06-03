import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute2 = ({ children }) => {
  const { allProducts } = useSelector((state) => state.product);



  if (!allProducts) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute2;
