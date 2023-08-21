import { Route, Routes } from "react-router-dom";
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

export function AppRoutes() {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/constructions" element={<Constructions />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/employees_new" element={<EmployeesNew />} />
        <Route path="/employees_timesheet" element={<EmployeesTimeSheet />} />
        <Route path="/thirdParty_new" element={<ThirdPartyNew />} />
        <Route path="/thirdParty_paycheck" element={<ThirdPartyPayCheck />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
    </MainLayout>
  ) : (
    <Routes>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}
