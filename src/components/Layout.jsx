
import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

const Layout = ({ onScratchClick, showScratchButton }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header
        onScratchClick={onScratchClick}
        showScratchButton={showScratchButton}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
