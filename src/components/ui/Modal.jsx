const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-8"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-[#1e2a6e] px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f5a623]">
              AirX Worldwide
            </p>
            <h2 className="text-lg font-extrabold text-white mt-0.5">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-blue-200 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Orange accent line */}
        <div className="h-0.5 bg-gradient-to-r from-[#1e2a6e] to-[#f5a623] shrink-0" />

        {/* Scrollable children */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;