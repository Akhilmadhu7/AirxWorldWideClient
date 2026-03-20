import { useState } from "react";
import RadioButton from "../components/ui/RadioButton";
import { trackShipmentAPI } from "../api/trackingApi";
import TrackingResult from "./TrackingResult";
import toast from "react-hot-toast";

const TRACKING_TYPES = [
  { label: "Domestic", value: "domestic" },
  { label: "International", value: "international" },
];

const TrackingCard = () => {
  const [trackingType, setTrackingType] = useState("awb");
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setIsLoading(true);
    try {
      const data = await trackShipmentAPI({
        awbNo: trackingId.trim(),
        type: trackingType,
      });
      console.log("Tracking data: ", data);
      const errorCode = data?.Response?.ErrorCode ?? null;
      if (errorCode == "1") {
        console.log("errocodeeee", errorCode, typeof errorCode);
        toast.error(
          data?.Response?.ErrorDisc ??
            "Please check tracking Id and try again.",
        );
        setTrackingError(
          data?.Response?.ErrorDisc ??
            "Please check tracking Id and try again.",
        );
      } else {
        setTrackingData(data);
        setIsResultOpen(true);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Tracking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleTrack();
  };

  return (
    <>
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Top accent line */}
          <div className="h-0.5 bg-gradient-to-r from-[#1e2a6e] to-[#f5a623]" />

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* Left — Track Your Order */}
            <div className="md:col-span-2 px-6 py-6">
              <h3 className="text-base font-extrabold text-[#1e2a6e] mb-4">
                Track Your Order
              </h3>

              {/* Radio buttons */}
              <div className="flex gap-6 mb-4">
                {TRACKING_TYPES.map((type) => (
                  <RadioButton
                    key={type.value}
                    label={type.label}
                    value={type.value}
                    name="trackingType"
                    checked={trackingType === type.value}
                    onChange={(e) => setTrackingType(e.target.value)}
                  />
                ))}
              </div>

              {/* Input + Track button */}
              <div className="flex gap-0">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Tracking ID here..."
                  className="flex-1 px-4 py-3 text-sm text-gray-700 border border-gray-200 border-r-0 rounded-l-xl outline-none focus:border-[#1e2a6e] focus:ring-2 focus:ring-[#1e2a6e]/10 transition-all placeholder-gray-400"
                />
                <button
                  onClick={handleTrack}
                  disabled={isLoading || !trackingId.trim()}
                  className={`px-6 py-3 text-sm font-bold rounded-r-xl transition-all duration-200 flex items-center gap-2 ${
                    isLoading || !trackingId.trim()
                      ? "bg-[#1e2a6e]/40 text-white cursor-not-allowed"
                      : "bg-[#1e2a6e] hover:bg-[#16205a] text-white cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  ) : null}
                  {isLoading ? "Tracking..." : "Track"}
                </button>
              </div>

              {/* Error message */}
              {trackingError && (
                <p className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {trackingError}
                </p>
              )}

              {/* Multiple tracking */}
              {/* <button className="mt-3 flex items-center gap-1 text-sm text-[#f5a623] hover:text-[#e09610] font-medium transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Multiple Tracking Numbers
              </button> */}
            </div>

            {/* Right — Branch Locator */}
            <div className="px-6 py-6 flex flex-col justify-center">
              <h3 className="text-base font-extrabold text-[#1e2a6e] mb-2">
                Branch Locator
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Conveniently locate our stores by entering the pin code, city
                and state.
              </p>
              <a
                href="#find-us"
                className="w-8 h-8 rounded-full bg-[#f5a623]/10 hover:bg-[#f5a623] flex items-center justify-center text-[#f5a623] hover:text-white transition-all duration-200 group"
              >
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <TrackingResult
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        data={trackingData}
        awbNo={trackingId}
      />
    </>
  );
};

export default TrackingCard;
