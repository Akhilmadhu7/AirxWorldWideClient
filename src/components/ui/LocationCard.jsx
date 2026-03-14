import ContactInfoItem from "./ContactInfoItem";

const LocationCard = ({ location, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        isActive
          ? "border-[#1e2a6e] bg-[#1e2a6e]/5"
          : "border-gray-100 bg-white hover:border-[#f5a623]/40 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className={`font-bold text-sm ${isActive ? "text-[#1e2a6e]" : "text-gray-700"}`}>
          {location.name}
        </h4>
        {isActive && (
          <span className="text-xs bg-[#f5a623] text-white px-2 py-0.5 rounded-full font-semibold">
            Selected
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400">{location.address}</p>
    </button>
  );
};

export default LocationCard;