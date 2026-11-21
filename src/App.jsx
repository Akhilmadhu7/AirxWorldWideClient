import Home from "./components/Home";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from "react-hot-toast";
import ScratchWinModal from "./components/ScratchWinModal";
import { useEffect, useState } from "react";

function App() {
  const [showScratch, setShowScratch] = useState(false);

  useEffect(() => {
    // Show popup only once per browser session
    // const alreadyShown = sessionStorage.getItem("scratchPopupShown");

    // if (!alreadyShown) {
    //   const timer = setTimeout(() => {
    //     setShowScratch(true);
    //     sessionStorage.setItem("scratchPopupShown", "true");
    //   }, 2500);

    //   return () => clearTimeout(timer);
    // }
    setShowScratch(true); // For testing purposes, show the popup every time
  }, []);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              background: "#f0fdf4",
              color: "#15803d",
              border: "1px solid #bbf7d0",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
            },
          },
        }}
      />

      {/* Global Scratch & Win Popup */}
      <ScratchWinModal
        open={showScratch}
        onClose={() => setShowScratch(false)}
        onClaim={() => {
          console.log("Reward claimed");
        }}
        prize="15% OFF"
        couponCode="RAYON15"
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;