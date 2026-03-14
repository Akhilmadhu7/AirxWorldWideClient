const ContactInfoItem = ({ icon, children }) => {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 w-8 h-8 rounded-full bg-[#f5a623]/10 flex items-center justify-center shrink-0">
        {icon}
      </span>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
};

export default ContactInfoItem;