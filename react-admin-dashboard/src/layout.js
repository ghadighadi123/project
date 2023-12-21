import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { useState } from "react";
const Layout = ({ children, title }) => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} title={title} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;