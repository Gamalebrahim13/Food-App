import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./assets/Shared/AuthLayout/AuthLayout";
import Login from "./modules/Authentication/Change-pass/Login/Login";
import Register from "./modules/Authentication/Change-pass/Register/Register";
import ForgetPass from "./modules/Authentication/Change-pass/Forget-pass/ForgetPass";
import VerifyAccount from "./modules/Authentication/Change-pass/Reset-pass/Verify-account/VerifyAccount";
import Dashboard from "./assets/Dashboard/Dashboard";
import Recipes from "./Recipes/Recipes";
import Favorite from "./Services/Favorite/Favorite ";
import MasterLayout from "./assets/Shared/AuthLayout/MasterLayout/MasterLayout";
import Users from "./modules/Users/Users";
import Categories from "./modules/Users/Categories/Categories";
import ResetPass from "./modules/Authentication/Change-pass/Reset-pass/ResetPass";
import ProtectedRoute from "./assets/Shared/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPass />} />
          <Route path="ResetPass" element={<ResetPass />} />
          <Route path="verifyaccount" element={<VerifyAccount />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MasterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} /> {/* default page */}
          <Route path="home" element={<Dashboard />} />
          <Route path="Recipes" element={<Recipes />} />
          <Route path="Favorite" element={<Favorite />} />
          <Route path="Users" element={<Users />} />
          <Route path="Categories" element={<Categories />} />
          {/* <Route path="ChangePassword" element={<ChangePasswordModal />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
