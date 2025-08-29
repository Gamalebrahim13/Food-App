import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    // لو مفيش توكن → رجعه على صفحة الـ Login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}


