import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Membersinfo from "./scenes/membersinfo";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Members from "./scenes/members";
import Teampaylip from "./scenes/teampaylip/Teampaylip";
import Login from "./scenes/login/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const currentUser = true;

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/team"
                element={
                  <RequireAuth>
                    <Team />
                  </RequireAuth>
                }
              />
              <Route
                path="/invoices"
                element={
                  <RequireAuth>
                    <Teampaylip />
                  </RequireAuth>
                }
              />
              <Route
                path="/membersinfo"
                element={
                  <RequireAuth>
                    <Membersinfo />
                  </RequireAuth>
                }
              />
              <Route
                path="/invoices"
                element={
                  <RequireAuth>
                    <Invoices />
                  </RequireAuth>
                }
              />
              <Route
                path="/form"
                element={
                  <RequireAuth>
                    <Form />
                  </RequireAuth>
                }
              />
              <Route
                path="/bar"
                element={
                  <RequireAuth>
                    <Bar />
                  </RequireAuth>
                }
              />
              <Route
                path="/pie"
                element={
                  <RequireAuth>
                    <Pie />
                  </RequireAuth>
                }
              />
              <Route
                path="/line"
                element={
                  <RequireAuth>
                    <Line />
                  </RequireAuth>
                }
              />
              <Route
                path="/faq"
                element={
                  <RequireAuth>
                    <FAQ />
                  </RequireAuth>
                }
              />
              <Route
                path="/Members"
                element={
                  <RequireAuth>
                    <Members />
                  </RequireAuth>
                }
              />
              <Route
                path="/calendar"
                element={
                  <RequireAuth>
                    <Calendar />
                  </RequireAuth>
                }
              />
              <Route
                path="/geography"
                element={
                  <RequireAuth>
                    <Geography />
                  </RequireAuth>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
