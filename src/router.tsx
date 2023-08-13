import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { MainLayout } from "./components/mainLayout";
import { Constructions } from "./pages/constructions";
import { Finance } from "./pages/finance";
import { ThirdParty } from "./pages/thirdParty";
import { Configuration } from "./pages/configuration";
import { Employees } from "./pages/employees";

export function AppRoutes() {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <MainLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/constructions" element={<Constructions />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/thirdParty" element={<ThirdParty />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
    </MainLayout>
  ) : (
    <Routes>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}
