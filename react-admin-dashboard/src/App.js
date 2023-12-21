import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import Calendar from "./scenes/calendar/calendar";
import Members from "./scenes/members";
import Teampaylip from "./scenes/teampaylip/Teampaylip";
import Contactsdata from "./scenes/contactsdata/";
import Login from "./scenes/login/login";
import Signup from "./scenes/login/Signup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Layout from "./Layout";
function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  const currentUser = true;
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };
  // const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} /> */}
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Layout>
                  <Dashboard />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/team"
            element={
              <RequireAuth>
                <Layout title="Manage Team">
                  <Team />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/invoices"
            element={
              <RequireAuth>
                <Layout>
                  <Teampaylip />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/membersinfo"
            element={
              <RequireAuth>
                <Layout>
                  <Membersinfo />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/contactsdata"
            element={
              <RequireAuth>
                <Layout>
                  <Contactsdata />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/invoices"
            element={
              <RequireAuth>
                <Layout>
                  <Invoices />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/form"
            element={
              <RequireAuth>
                <Layout>
                  <Form />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/bar"
            element={
              <RequireAuth>
                <Layout>
                  <Bar />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/pie"
            element={
              <RequireAuth>
                <Layout>
                  <Pie />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/line"
            element={
              <RequireAuth>
                <Layout>
                  <Line />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/faq"
            element={
              <RequireAuth>
                <Layout>
                  <FAQ />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/Members"
            element={
              <RequireAuth>
                <Layout>
                  <Members />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <Layout>
                  <Calendar />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/geography"
            element={
              <RequireAuth>
                <Layout>
                  <Geography />
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
        {/* </main>
        </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
