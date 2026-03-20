const Input = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#1e2a6e]">
          {label}
          {required && <span className="text-[#f5a623] ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 text-sm text-gray-700 bg-white border rounded-xl
          placeholder-gray-400 outline-none transition-all duration-200
          border-gray-200 focus:border-[#1e2a6e] focus:ring-2 focus:ring-[#1e2a6e]/10
          ${error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}
          ${className}`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default Input;