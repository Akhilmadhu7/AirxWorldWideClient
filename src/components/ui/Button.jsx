/**
 * Button Component
 *
 * Variants:
 *  "success" → solid green   — Save, Confirm, Submit
 *  "cancel"  → outlined red  — Cancel, Discard (pairs with success)
 *  "add"     → solid indigo  — Add User, New Item (standalone)
 *
 * Usage:
 *  <Button variant="success" label="Save Changes" onClick={handleSave} />
 *  <Button variant="cancel"  label="Cancel"       onClick={handleCancel} />
 *  <Button variant="add"     label="Add User"     onClick={handleAdd} />
 *
 * Props:
 *  label     string   — button text
 *  variant   string   — "success" | "cancel" | "add"
 *  size      string   — "sm" | "md" | "lg"
 *  disabled  boolean
 *  loading   boolean  — shows spinner, disables button
 *  onClick   function
 *  className string   — extra Tailwind overrides
 */

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
    />
  </svg>
);

const Button = ({
  label = "Button",
  onClick,
  type="submit",
  variant = "success",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}) => {
  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5    py-2.5 text-sm gap-2",
    lg: "px-7    py-3   text-base gap-2.5",
  };

  const variants = {
    // AirX Navy — primary confirm/add action
    success: [
      "bg-[#1e2a6e] text-white border border-[#1e2a6e]",
      "hover:bg-[#16205a] hover:border-[#16205a]",
      "focus-visible:ring-2 focus-visible:ring-[#1e2a6e]/50 focus-visible:ring-offset-2",
      "disabled:bg-[#1e2a6e]/40 disabled:border-[#1e2a6e]/40 disabled:cursor-not-allowed",
    ].join(" "),

    // Outlined red — cancel/destructive, inverts on hover
    cancel: [
      "bg-white text-red-500 border border-red-400",
      "hover:bg-red-500 hover:text-white hover:border-red-500",
      "focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2",
      "disabled:opacity-40 disabled:cursor-not-allowed",
    ].join(" "),
  };

  // const icons = {
  //   success: <CheckIcon />,
  //   cancel:  <XIcon />,
  //   add:     <PlusIcon />,
  // };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium tracking-wide
        rounded-lg transition-all duration-200 cursor-pointer outline-none
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <SpinnerIcon />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {/* {icons[variant]} */}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default Button;
