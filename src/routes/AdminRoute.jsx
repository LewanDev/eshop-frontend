import { Navigate } from "react-router-dom";

export default function AdminRoute({ user, children }) {
  if (!user?.isAdmin) {
    // 👇 redirige a un error o login si no es admin
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
