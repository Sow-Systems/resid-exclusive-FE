import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { MainLayout } from "./components/mainLayout";
import { Constructions } from "./pages/constructions";
import { Finance } from "./pages/finance";
import { ThirdPartyNew } from "./pages/thirdPartyNew";
import { ThirdPartyPayCheck } from "./pages/thirdPartyPayCheck";
import { Configuration } from "./pages/configuration";
import { EmployeesNew } from "./pages/employeesNew";
import { EmployeesTimeSheet } from "./pages/employeesTimeSheet";
import { PrivateRoute } from "./utils/privateRoutes";
import { useAuth } from "./contexts/AuthContext";

const AuthenticatedRoutes = () => (
  <MainLayout>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/constructions"
        element={
          <PrivateRoute>
            <Constructions />
          </PrivateRoute>
        }
      />
      <Route
        path="/finance"
        element={
          <PrivateRoute>
            <Finance />
          </PrivateRoute>
        }
      />
      <Route
        path="/employees_new"
        element={
          <PrivateRoute>
            <EmployeesNew />
          </PrivateRoute>
        }
      />
      <Route
        path="/employees_timesheet"
        element={
          <PrivateRoute>
            <EmployeesTimeSheet />
          </PrivateRoute>
        }
      />
      <Route
        path="/thirdParty_new"
        element={
          <PrivateRoute>
            <ThirdPartyNew />
          </PrivateRoute>
        }
      />
      <Route
        path="/thirdParty_paycheck"
        element={
          <PrivateRoute>
            <ThirdPartyPayCheck />
          </PrivateRoute>
        }
      />
      <Route
        path="/configuration"
        element={
          <PrivateRoute>
            <Configuration />
          </PrivateRoute>
        }
      />
    </Routes>
  </MainLayout>
);

export function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      {token ? (
        <Route path="/*" element={<AuthenticatedRoutes />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
