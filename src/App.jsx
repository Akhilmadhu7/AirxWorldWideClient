
import Home from "./components/Home";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScratchWinModal from "./components/ScratchWinModal";
import { useEffect, useState } from "react";

// All Scratch & Win settings are maintained here.
const SCRATCH_CONFIG = {
  enabled: true,           // Master switch for the feature
  showAutoPopup: true,      // Automatically show the popup
  showHeaderButton: true,   // Show Scratch & Win button in header
  popupDelay: 2500,         // Delay before showing popup (milliseconds)
  oncePerSession: true,     // Show automatic popup only once per session
};

function App() {
  const [showScratch, setShowScratch] = useState(false);

  useEffect(() => {
    // Don't run automatic popup if the feature is disabled.
    if (!SCRATCH_CONFIG.enabled || !SCRATCH_CONFIG.showAutoPopup) {
      return;
    }

    // Check whether the popup was already shown in this session.
    const alreadyShown = sessionStorage.getItem("scratchPopupShown");

    if (SCRATCH_CONFIG.oncePerSession && alreadyShown) {
      return;
    }

    const timer = setTimeout(() => {
      setShowScratch(true);

      if (SCRATCH_CONFIG.oncePerSession) {
        sessionStorage.setItem("scratchPopupShown", "true");
      }
    }, SCRATCH_CONFIG.popupDelay);

    return () => clearTimeout(timer);
  }, []);

  // Common function for opening the modal.
  const openScratchModal = () => {
    if (!SCRATCH_CONFIG.enabled) return;
    setShowScratch(true);
  };

  const closeScratchModal = () => {
    setShowScratch(false);
  };

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

      {/* Global Scratch & Win Modal */}
      {SCRATCH_CONFIG.enabled && (
        <ScratchWinModal
          open={showScratch}
          onClose={closeScratchModal}
        />
      )}

      <Routes>
        <Route
          element={
            <Layout
              onScratchClick={openScratchModal}
              showScratchButton={
                SCRATCH_CONFIG.enabled &&
                SCRATCH_CONFIG.showHeaderButton
              }
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
