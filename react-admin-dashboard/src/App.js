import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Team from "./scenes/team";
import Membersinfo from "./scenes/membersinfo";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Members from "./scenes/members";
import Teampaylip from "./scenes/teampaylip/Teampaylip";
import Contactsdata from "./scenes/contactsdata/";
import Login from "./scenes/login/login";
import Signup from "./scenes/login/signup";
import Layout from "./layout";

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
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
                <Layout title="Manage Team">
                  <Teampaylip />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/membersinfo"
            element={
              <RequireAuth>
                <Layout title="Members Information">
                  <Membersinfo />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/contactsdata"
            element={
              <RequireAuth>
                <Layout title="Contacts">
                  <Contactsdata />
                </Layout>
              </RequireAuth>
            }
          />

          <Route
            path="/form"
            element={
              <RequireAuth>
                <Layout title="Contacts Form">
                  <Form />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/faq"
            element={
              <RequireAuth>
                '
                <Layout title="Contacts">
                  <FAQ />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/Members"
            element={
              <RequireAuth>
                <Layout title="Add Member">
                  <Members />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <Layout title="Calendar">
                  <Calendar />
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
