import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";
import Input from "./ui/Input";
import Button from "./ui/Button";

const FIELDS = [
  { id: "length", name: "length", label: "Length (cm)", placeholder: "e.g. 30" },
  { id: "width",  name: "width",  label: "Width (cm)",  placeholder: "e.g. 20" },
  { id: "height", name: "height", label: "Height (cm)", placeholder: "e.g. 15" },
];

const BoxIcon = () => (
  <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Box body */}
    <polygon points="40,60 100,30 160,60 160,120 100,150 40,120" fill="#e8c98a" stroke="#c9a96e" strokeWidth="1.5"/>
    {/* Top face */}
    <polygon points="40,60 100,30 160,60 100,90" fill="#f0d9a0" stroke="#c9a96e" strokeWidth="1.5"/>
    {/* Right face */}
    <polygon points="160,60 100,90 100,150 160,120" fill="#d4a96a" stroke="#c9a96e" strokeWidth="1.5"/>
    {/* Tape on top */}
    <polygon points="90,30 110,30 100,90 90,90" fill="white" opacity="0.5"/>
    {/* Tape on front */}
    <polygon points="40,60 40,120 50,120 50,60" fill="white" opacity="0.3"/>
    {/* Length label */}
    <line x1="40" y1="135" x2="100" y2="155" stroke="#1e2a6e" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="55" y="152" fill="#1e2a6e" fontSize="11" fontWeight="600">Length</text>
    {/* Width label */}
    <line x1="100" y1="155" x2="160" y2="135" stroke="#1e2a6e" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="118" y="152" fill="#1e2a6e" fontSize="11" fontWeight="600">Width</text>
    {/* Height label */}
    <line x1="165" y1="60" x2="175" y2="90" stroke="#1e2a6e" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="178" y="94" fill="#1e2a6e" fontSize="11" fontWeight="600">Height</text>
  </svg>
);

const VolumetricCalculator = () => {
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" });
  const [result, setResult]         = useState(null);
  const [errors, setErrors]         = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // only allow numbers and decimals
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setDimensions((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (result !== null) setResult(null);
  };

  const validate = () => {
    const newErrors = {};
    FIELDS.forEach(({ name, label }) => {
      if (!dimensions[name] || dimensions[name].trim() === "") {
        newErrors[name] = `${label} is required.`;
      } else if (parseFloat(dimensions[name]) <= 0) {
        newErrors[name] = `${label} must be greater than 0.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    console.log("Calculate calling: ")
    if (!validate()) return;
    const { length, width, height } = dimensions;
    const volumetricWeight = (
      (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 5000
    ).toFixed(2);
    setResult(volumetricWeight);
  };

  const handleReset = () => {
    setDimensions({ length: "", width: "", height: "" });
    setResult(null);
    setErrors({});
  };

  return (
    <section className="w-full bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <SectionHeader
          badge="Tools"
          title="Volumetric Weight Calculator"
          center={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — Info + Box illustration */}
          <div className="flex flex-col gap-6">

            {/* Description */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                We've created a simple and effective tool to help you plan and
                estimate your shipment costs with confidence.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Volumetric weight is a pricing method used by courier and logistics
                companies to ensure fair and accurate billing. It considers the amount
                of space a package occupies in relation to its actual weight. If a
                shipment is large but lightweight, the shipping cost may be calculated
                based on its volumetric weight rather than the physical weight, as it
                takes up more valuable cargo space.
              </p>
            </div>

            {/* Formula pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e2a6e]/5 border border-[#1e2a6e]/10 rounded-xl w-fit">
              <svg className="w-4 h-4 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold text-[#1e2a6e] tracking-wide">
                Formula: (L × W × H) ÷ 5000 = Volumetric Weight (kg)
              </span>
            </div>

            {/* Box illustration */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <BoxIcon />
            </div>

          </div>

          {/* Right — Calculator form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

            <h3 className="text-base font-extrabold text-[#1e2a6e] mb-1">
              Enter Dimensions
            </h3>
            <div className="w-8 h-0.5 bg-[#f5a623] rounded-full mb-6" />

            {/* Input fields */}
            <div className="space-y-4">
              {FIELDS.map((field) => (
                <Input
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={dimensions[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                label="Calculate"
                variant="success"
                type="button"
                onClick={handleCalculate}
                className="flex-1"
              />
              <Button
                label="Reset"
                variant="cancel"
                type="button"
                onClick={handleReset}
                className="flex-1"
              />
            </div>

            {/* Result */}
            {result !== null && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Volumetric Weight
                  </span>
                  <span className="text-3xl font-black text-[#1e2a6e]">
                    {result}
                    <span className="text-base font-semibold text-gray-400 ml-1">kg</span>
                  </span>
                </div>

                {/* Result note */}
                <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                  The chargeable weight will be the higher of the actual weight
                  and the volumetric weight of your shipment.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default VolumetricCalculator;