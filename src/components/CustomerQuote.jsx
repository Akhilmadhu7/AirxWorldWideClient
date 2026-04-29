import React, { useState } from "react";
import Form from "./Form";
import Input from "./ui/Input";
// import { createCustomerQuote } from "../api/customerQuote";
import { customerQuoteAPI } from "../api/customerQuote";
import toast from "react-hot-toast";
import handleErrorResponses from "../api/handleErrorResponse";

const Stat = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-2xl font-bold text-[#2749cf]">{value}</span>
    <span className="text-xs text-gray-500 leading-tight">{label}</span>
  </div>
);

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2749cf]">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const EMPTY_FORM = {
  customerQuoteFullName: "",
  customerQuotePhoneNumber: "",
  customerQuoteEmail: "",
  customerQuoteSenderAddress: "",
  customerQuoteReceiverAddress: "",
  customerQuoteActualWeight: "",
  customerQuoteVolumetricWeight: "",
  customerQuoteRequirement: "",
};

const CustomerQuote = ({ onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerQuoteFullName.trim())
      newErrors.customerQuoteFullName = "Full name is required";
    if (!formData.customerQuoteSenderAddress.trim())
      newErrors.customerQuoteSenderAddress = "Sender's address is required";
    if (!formData.customerQuoteReceiverAddress.trim())
      newErrors.customerQuoteReceiverAddress =
        "Receiver's address is required";
    if (!formData.customerQuoteActualWeight)
      newErrors.customerQuoteActualWeight = "Actual weight is required";
    else if (
      isNaN(formData.customerQuoteActualWeight) ||
      Number(formData.customerQuoteActualWeight) <= 0
    )
      newErrors.customerQuoteActualWeight = "Enter a valid weight";
    if (!formData.customerQuoteVolumetricWeight)
      newErrors.customerQuoteVolumetricWeight =
        "Volumetric weight is required";
    else if (
      isNaN(formData.customerQuoteVolumetricWeight) ||
      Number(formData.customerQuoteVolumetricWeight) <= 0
    )
      newErrors.customerQuoteVolumetricWeight = "Enter a valid weight";
    if (!formData.customerQuoteRequirement.trim())
      newErrors.customerQuoteRequirement = "Description is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // await createCustomerQuote({ payload: formData });
      await customerQuoteAPI.createCustomerQuote(formData);
        
      toast.success(
        "Your quote request has been submitted! Our team will get back to you shortly.",
      );
      setFormData(EMPTY_FORM);

      


    } catch (errs) {
      console.log("raw error from API:", errs);
      const err = handleErrorResponses(errs);
      console.error("CustomerQuote submit error:", err);
      console.log("error type:", typeof err);
      if (typeof err === "object") {
        console.log("error object keys:", Object.keys(err));
        
        setErrors(err);
      } else {
            toast.error(errorMessage || "Failed to create coupon.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const textareaClass = (field) =>
    `bg-white border text-black text-sm rounded-lg block w-full p-2.5 resize-none
     focus:outline-none focus:ring-2 focus:ring-[#2749cf] focus:border-[#2749cf]
     ${errors[field] ? "border-red-400 focus:ring-red-400" : "border-blue-500"}`;

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* ── LEFT: marketing copy ───────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6 p-6 sm:p-8 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100">
              <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#2749cf]">
                Free &amp; No Obligation
              </span>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">
                  Get an Instant <br />
                  <span className="text-[#2749cf]">Delivery Quote</span>
                </h2>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  Tell us about your shipment and we'll get back to you with the
                  best rates — fast, transparent, and tailored to your needs.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-y border-gray-200 py-5">
                <Stat value="10k+" label="Deliveries completed" />
                <Stat value="98%" label="On-time rate" />
                <Stat value="24h" label="Quote turnaround" />
              </div>

              <div className="flex flex-col gap-5">
                <Feature
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  title="Transparent Pricing"
                  desc="No hidden fees. What you see in the quote is exactly what you pay."
                />
                <Feature
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                  title="Lightning Fast Response"
                  desc="Our team reviews every request within hours — often sooner."
                />
                <Feature
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                      />
                    </svg>
                  }
                  title="Dedicated Support"
                  desc="A real person follows up on every quote — not a bot, not a template."
                />
              </div>
            </div>

            {/* ── RIGHT: form ─────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <Form
                title="Get a Quote"
                onSubmit={handleSubmit}
                submitLabel="Submit Request"
                isLoading={isLoading}
                onClose={onClose}
              >
                {/* Full Name */}
                <Input
                  label="Full Name"
                  name="customerQuoteFullName"
                  id="customerQuoteFullName"
                  value={formData.customerQuoteFullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  error={errors.customerQuoteFullName}
                />

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    name="customerQuotePhoneNumber"
                    id="customerQuotePhoneNumber"
                    value={formData.customerQuotePhoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    error={errors.customerQuotePhoneNumber}
                  />
                  <Input
                    label="Email"
                    name="customerQuoteEmail"
                    id="customerQuoteEmail"
                    type="email"
                    value={formData.customerQuoteEmail}
                    onChange={handleChange}
                    placeholder="Email"
                    error={errors.customerQuoteEmail}
                  />
                </div>

                {/* Sender + Receiver Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="customerQuoteSenderAddress"
                      className="text-sm font-medium text-black"
                    >
                      Sender's Address{" "}
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <textarea
                      id="customerQuoteSenderAddress"
                      name="customerQuoteSenderAddress"
                      value={formData.customerQuoteSenderAddress}
                      onChange={handleChange}
                      placeholder="Sender's Address"
                      rows={3}
                      className={textareaClass("customerQuoteSenderAddress")}
                    />
                    {errors.customerQuoteSenderAddress && (
                      <p className="text-red-400 text-xs">
                        {errors.customerQuoteSenderAddress}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="customerQuoteReceiverAddress"
                      className="text-sm font-medium text-black"
                    >
                      Receiver's Address{" "}
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <textarea
                      id="customerQuoteReceiverAddress"
                      name="customerQuoteReceiverAddress"
                      value={formData.customerQuoteReceiverAddress}
                      onChange={handleChange}
                      placeholder="Receiver's Address"
                      rows={3}
                      className={textareaClass(
                        "customerQuoteReceiverAddress",
                      )}
                    />
                    {errors.customerQuoteReceiverAddress && (
                      <p className="text-red-400 text-xs">
                        {errors.customerQuoteReceiverAddress}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actual + Volumetric Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Actual Weight (kg)"
                    name="customerQuoteActualWeight"
                    id="customerQuoteActualWeight"
                    type="number"
                    value={formData.customerQuoteActualWeight}
                    onChange={handleChange}
                    placeholder="Actual Weight"
                    required
                    error={errors.customerQuoteActualWeight}
                  />
                  <Input
                    label="Volumetric Weight (kg)"
                    name="customerQuoteVolumetricWeight"
                    id="customerQuoteVolumetricWeight"
                    type="number"
                    value={formData.customerQuoteVolumetricWeight}
                    onChange={handleChange}
                    placeholder="Volumetric Weight"
                    required
                    error={errors.customerQuoteVolumetricWeight}
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="customerQuoteRequirement"
                    className="text-sm font-medium text-black"
                  >
                    Description <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    id="customerQuoteRequirement"
                    name="customerQuoteRequirement"
                    value={formData.customerQuoteRequirement}
                    onChange={handleChange}
                    placeholder="Describe your requirements..."
                    rows={4}
                    className={textareaClass("customerQuoteRequirement")}
                  />
                  {errors.customerQuoteRequirement && (
                    <p className="text-red-400 text-xs">
                      {errors.customerQuoteRequirement}
                    </p>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerQuote;
