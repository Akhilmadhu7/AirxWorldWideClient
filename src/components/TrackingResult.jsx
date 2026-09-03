import { format } from "date-fns";
import Modal from "./ui/Modal";
import InfoCard from "./ui/InfoCard";
import InfoRow from "./ui/InfoRow";

const AccountIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-6 2-6 4h12c0-2-2-4-6-4z" />
  </svg>
);

const ShipmentIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8l-2 4h12l-2-4z" />
  </svg>
);

const EventIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const LocationPinIcon = () => (
  <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// timestamp is an ISO string from NormalizedTracking (e.g. "2026-07-28T21:58:00")
const formatDate = (isoString) => (isoString ? format(new Date(isoString), "d MMM yyyy") : "");
const formatTime = (isoString) => (isoString ? format(new Date(isoString), "h:mm a") : "");

const TrackingResultModal = ({ isOpen, onClose, trackingData, awbNo }) => {
  if (!trackingData) return null;

  const events = trackingData?.events ?? [];
  const isDelivered = trackingData?.status === "delivered";
  const latestStatusLabel = events[0]?.status_raw || trackingData?.status || "In Transit";
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Shipment Tracking"
      subtitle={`AWB No: ${awbNo}`}
    >
      {/* ── 1. Sender / Receiver ── */}
      <InfoCard title="Account Details" icon={<AccountIcon />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <InfoRow label="Shipper"       value={trackingData?.shipper_name} />
          <InfoRow label="Consignee"     value={trackingData?.consignee_name} />
          <InfoRow label="Origin"        value={trackingData?.origin} />
          <InfoRow label="Destination"   value={trackingData?.destination} />
          <InfoRow label="From Country"  value={trackingData?.origin_country} />
          <InfoRow label="To Country"    value={trackingData?.destination_country} />
          {trackingData?.delivery_date && (
            <InfoRow
              label="Delivered On"
              value={`${formatDate(trackingData.delivery_date)} ${formatTime(trackingData.delivery_date)}`}
            />
          )}
          {trackingData?.receiver_name && (
            <InfoRow label="Received By" value={trackingData.receiver_name} />
          )}
        </div>
      </InfoCard>

      {/* ── 2. Shipment Summary ── */}
      <InfoCard title="Shipment Details" icon={<ShipmentIcon />}>
        {/* Status badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isDelivered
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-[#f5a623]/10 text-[#f5a623] border border-[#f5a623]/20"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDelivered ? "bg-green-500" : "bg-[#f5a623]"}`} />
            {latestStatusLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <InfoRow label="AWB No"        value={trackingData?.tracking_id} />
          <InfoRow label="Ref No"        value={trackingData?.ref_no} />
          <InfoRow label="Booking Date"  value={formatDate(trackingData?.booking_date)} />
          <InfoRow label="Service"       value={trackingData?.service_name} />
          <InfoRow label="Vendor"        value={trackingData?.vendor_name} />
          {/* <InfoRow label="Weight"        value={trackingData?.weight_kg ? `${trackingData.weight_kg} kg` : null} /> */}
        </div>
      </InfoCard>

      {/* ── 3. Shipment Events ── */}
      <InfoCard title="Shipment Events" icon={<EventIcon />}>
        {events.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            No events found.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {events.map((event, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                {/* Status */}
                <p className={`text-sm font-bold mb-1 ${
                  index === 0 ? "text-[#1e2a6e]" : "text-gray-700"
                }`}>
                  {index === 0 && (
                    <span className="inline-block w-2 h-2 rounded-full bg-[#f5a623] mr-2 mb-0.5" />
                  )}
                  {event?.status_raw}
                </p>

                {/* Date — Time */}
                <p className="text-xs text-gray-400 mb-1.5">
                  {formatDate(event?.timestamp)}
                  {event?.timestamp && <span className="mx-1.5">—</span>}
                  {formatTime(event?.timestamp)}
                </p>

                {/* Location */}
                {event?.location && (
                  <div className="flex items-center gap-1">
                    <LocationPinIcon />
                    <span className="text-xs text-gray-500 font-medium">
                      {event.location}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </InfoCard>
    </Modal>
  );
};

export default TrackingResultModal;