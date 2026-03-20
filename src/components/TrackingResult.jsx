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

const TrackingResultModal = ({ isOpen, onClose, data, awbNo }) => {
  if (!data) return null;
console.log("tracking data is here: ",data)
  const tracking = data?.Response?.Tracking?.[0] ?? {};
  const events   = data?.Response?.Events        ?? [];
    console.log("tracking : ", tracking)
    console.log("eents; ====", events)
  // latest status is first event
  const latestStatus = events[0]?.Status ?? "";

  const isDelivered = latestStatus.toLowerCase().includes("delivered");

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
          <InfoRow label="Shipper"       value={tracking?.Shipper_Name} />
          <InfoRow label="Consignee"     value={tracking?.Consignee} />
          <InfoRow label="Origin"        value={tracking?.Origin} />
          <InfoRow label="Destination"   value={tracking?.Destination} />
          <InfoRow label="From Country"  value={tracking?.Origin_Country} />
          <InfoRow label="To Country"    value={tracking?.Destination_Country} />
          {tracking?.DeliveryDate1 && (
            <InfoRow label="Delivered On" value={`${tracking.DeliveryDate1} ${tracking.DeliveryTime1 ?? ""}`} />
          )}
          {tracking?.ReceiverName && (
            <InfoRow label="Received By"  value={tracking.ReceiverName} />
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
            {latestStatus || "In Transit"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          <InfoRow label="AWB No"        value={tracking?.AWBNo} />
          <InfoRow label="Ref No"        value={tracking?.RefNo} />
          <InfoRow label="Booking Date"  value={tracking?.BookingDate1} />
          <InfoRow label="Service"       value={tracking?.ServiceName} />
          <InfoRow label="Vendor"        value={tracking?.VendorName} />
          <InfoRow label="Weight"        value={tracking?.Weight ? `${tracking.Weight} kg` : null} />
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
              <div
                key={index}
                className="py-4 first:pt-0 last:pb-0"
              >
                {/* Status */}
                <p className={`text-sm font-bold mb-1 ${
                  index === 0 ? "text-[#1e2a6e]" : "text-gray-700"
                }`}>
                  {index === 0 && (
                    <span className="inline-block w-2 h-2 rounded-full bg-[#f5a623] mr-2 mb-0.5" />
                  )}
                  {event?.Status}
                </p>

                {/* Date — Time */}
                <p className="text-xs text-gray-400 mb-1.5">
                  {event?.EventDate1}
                  {event?.EventTime1 && (
                    <span className="mx-1.5">—</span>
                  )}
                  {event?.EventTime1}
                </p>

                {/* Location */}
                {event?.Location && (
                  <div className="flex items-center gap-1">
                    <LocationPinIcon />
                    <span className="text-xs text-gray-500 font-medium">
                      {event.Location}
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