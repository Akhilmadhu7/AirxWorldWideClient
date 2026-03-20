const RadioButton = ({ label, value, name, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        {/* Outer ring */}
        <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
          checked
            ? "border-[#1e2a6e]"
            : "border-gray-300 group-hover:border-[#1e2a6e]/50"
        }`}>
          {/* Inner dot */}
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1e2a6e]" />
            </div>
          )}
        </div>
      </div>
      <span className={`text-sm font-medium transition-colors ${
        checked ? "text-[#1e2a6e]" : "text-gray-500 group-hover:text-[#1e2a6e]"
      }`}>
        {label}
      </span>
    </label>
  );
};

export default RadioButton;