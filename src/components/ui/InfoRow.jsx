const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 w-2/5">
        {label}
      </span>
      <span className="text-sm text-[#1e2a6e] font-medium text-right w-3/5 break-words">
        {value}
      </span>
    </div>
  );
};

export default InfoRow;