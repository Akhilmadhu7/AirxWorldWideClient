import { useState } from "react";
import RadioButton from "../components/ui/RadioButton";
import { trackShipmentAPI } from "../api/trackingApi";
import TrackingResult from "./TrackingResult";

const TRACKING_TYPES = [
  { label: "Domestic",      value: "DOMESTIC" },
  { label: "International", value: "INTERNATIONAL" },
];

const TrackingCard = () => {
  const [trackingType, setTrackingType] = useState(null); // ← null = nothing selected
  const [trackingId, setTrackingId]     = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [trackingError, setTrackingError] = useState(null);

  const handleTrack = async () => {
    // clear previous error
    if (trackingError) setTrackingError(null);

    // validate shipment type
    if (!trackingType) {
      setTrackingError("Please select a shipment type — Domestic or International.");
      return;
    }

    // validate tracking id
    if (!trackingId.trim()) {
      setTrackingError("Please enter a tracking ID.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await trackShipmentAPI({
        awb_number: trackingId.trim(),
        courier_type: trackingType,
      });

      const errorCode = data?.Response?.ErrorCode ?? null;
      if (errorCode === "1") {
        setTrackingError(
          data?.Response?.ErrorDisc ?? "Please check tracking ID and try again."
        );
      } else {
        setTrackingData(data);
        setIsResultOpen(true);
      }
    } catch (error) {
      setTrackingError(error?.message ?? "Something went wrong. Please try again.");
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
                    onChange={(e) => {
                      setTrackingType(e.target.value);
                      if (trackingError) setTrackingError(null); // clear on change
                    }}
                  />
                ))}
              </div>

              {/* Input + Track button */}
              <div className="flex gap-0">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    if (trackingError) setTrackingError(null); // clear on type
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Tracking ID here..."
                  className={`flex-1 px-4 py-3 text-sm text-gray-700 border border-r-0 rounded-l-xl outline-none focus:ring-2 transition-all placeholder-gray-400 ${
                    trackingError
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-[#1e2a6e] focus:ring-[#1e2a6e]/10"
                  }`}
                />
                <button
                  onClick={handleTrack}
                  disabled={isLoading}
                  className={`px-6 py-3 text-sm font-bold rounded-r-xl transition-all duration-200 flex items-center gap-2 ${
                    isLoading
                      ? "bg-[#1e2a6e]/40 text-white cursor-not-allowed"
                      : "bg-[#1e2a6e] hover:bg-[#16205a] text-white cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : null}
                  {isLoading ? "Tracking..." : "Track"}
                </button>
              </div>

              {/* Error message */}
              {trackingError && (
                <p className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {trackingError}
                </p>
              )}
            </div>

            {/* Right — Price Calculator */}
            <div className="px-6 py-6 flex flex-col justify-center gap-4">

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#f5a623]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-extrabold text-[#1e2a6e] mb-1">
                  Price Calculator
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Estimate your shipping cost by weight, destination and service type.
                </p>
              </div>

              {/* CTA */}
              <a
                href="/price-calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1e2a6e] hover:bg-[#16205a] text-white text-sm font-semibold rounded-xl transition-colors duration-200 w-fit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Calculate Price
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