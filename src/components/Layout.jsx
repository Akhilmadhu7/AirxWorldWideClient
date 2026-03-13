import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Outlet />  {/* ← renders the matched child route */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;