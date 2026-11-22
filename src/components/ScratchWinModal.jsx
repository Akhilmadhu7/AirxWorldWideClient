import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { scratchGiftAPI } from "../api/scratchGift";
import toast from "react-hot-toast";
import Input from "./ui/Input";

const ScratchWinModal = ({ open, onClose }) => {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const [step, setStep] = useState("details");
  const [scratchData, setScratchData] = useState(null);

  //for storing scratch form data
  const [formData, setFormData] = useState({
    tracking_id: "",
    phone_number: "",
  });

  //to store errors from API response
  const [errors, setErrors] = useState({});

  // Loading state for API call
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tracking_id.trim() || !formData.phone_number.trim()) {
      toast.error("Please enter both Tracking ID and Phone Number");
      return;
    }

    try {
      setLoading(true);

      const response = await scratchGiftAPI.createScratchGift({
        tracking_id: formData.tracking_id.trim(),
        phone_number: formData.phone_number.trim(),
      });

      console.log("Scratch gift API response:", response);
      setScratchData(response?.data || null);
      // API validation successful
      setStep("scratch");
    } catch (error) {
      console.error("Error creating scratch gift:", error?.response);
      const status = error?.response?.status;
      console.log("Error status:", status);

      if (status === 400) {
        //adding error state for tracking id and phone number.
        //added trackign_id field value as true if error occurs because we need to display the input border in red color for tracking id and phone number.
        setErrors({
          tracking_id: true,
          phone_number:
            error?.response?.data?.message ||
            "Invalid tracking id or phone number",
        });
      } else if (status === 404) {
        setErrors({
          tracking_id: true,
          phone_number:
            error?.response?.data?.message ||
            "Shipment not found. Please check your details.",
        });
      } else {
        setErrors({
          tracking_id: true,
          phone_number:
            error?.response?.data?.message ||
            "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (e) => {
    //once the user clicks on claim button, we will call the claim API to claim the reward and close the modal.
    e.preventDefault();

    try {
      setLoading(true);

      const response = await scratchGiftAPI.claimScratchGift({
        tracking_id: formData.tracking_id.trim(),
        phone_number: formData.phone_number.trim(),
      });

      console.log("Claim scratch gift API response:", response);
      //   toast.success("Reward claimed! Check your email for details.");
      onClose();
    } catch (error) {
      console.error("Error claiming scratch gift:", error?.response);
      setErrors({
        phone_number:
          error?.response?.data?.errors ||
          "Failed to claim reward. Please try again.",
      });
      //   toast.error("Failed to claim reward. Please try again.");
    } finally {
      setLoading(false);
      onClose(); // Close the modal after claiming, regardless of success or failure
    }
  };

  useEffect(() => {
    if (!open) return;

    setStep("details");
    setFormData({
      tracking_id: "",
      phone_number: "",
    });
    setRevealed(false);
  }, [open]);

  useEffect(() => {
    if (!open || step !== "scratch") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 640, 280);
    gradient.addColorStop(0, "#D9D9D9");
    gradient.addColorStop(0.5, "#F5F5F5");
    gradient.addColorStop(1, "#B8B8B8");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 640, 280);

    ctx.fillStyle = "#1e2a6e";
    ctx.textAlign = "center";
    ctx.font = "bold 34px Arial";
    ctx.fillText("SCRATCH HERE", 320, 125);

    ctx.font = "22px Arial";
    ctx.fillStyle = "#555555";
    ctx.fillText("Reveal your surprise!", 320, 165);

    ctx.globalCompositeOperation = "destination-out";
  }, [open, step]);

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed || e.buttons !== 1) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkScratch = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let scratched = 0;
    let total = 0;

    // Sample every 8 pixels for performance
    for (let i = 3; i < data.length; i += 32) {
      total++;
      if (data[i] < 128) scratched++;
    }

    if (scratched / total >= 0.4) {
      setRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center
      bg-black/60 backdrop-blur-sm p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="scratch-title"
        className="relative w-full max-w-115 overflow-hidden
        rounded-2xl bg-white shadow-2xl
        animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-20 flex h-9 w-9
          items-center justify-center rounded-full
          bg-white/90 text-gray-600 shadow-sm
          hover:bg-gray-100 transition  cursor-pointer"
        >
          ✕
        </button>

        {/* Header */}
        <div
          className="relative overflow-hidden bg-[#1e2a6e]
          px-5 pb-7 pt-8 text-center text-white"
        >
          <div className="mb-3 text-4xl">🎁</div>

          <p
            className="text-xs font-semibold uppercase
            tracking-[0.25em] text-yellow-300"
          >
            A Special Surprise For You
          </p>

          <h2
            id="scratch-title"
            className="mt-2 text-3xl font-extrabold tracking-wide"
          >
            SCRATCH & WIN
          </h2>

          <p className="mt-2 text-sm text-blue-100">
            Your next shipment just got more exciting!
          </p>

          {/* Decorative circles */}
          <div
            className="absolute -left-10 -top-10 h-32 w-32
            rounded-full bg-white/5"
          />
          <div
            className="absolute -bottom-16 -right-10 h-40 w-40
            rounded-full bg-white/5"
          />
        </div>

        {/* Content */}

        {/* Content */}
        <div className="px-5 pb-6 pt-5 sm:px-7">
          {step === "details" ? (
            /* STEP 1: Shipment Details Form */
            <form onSubmit={handleSubmit}>
              <div className="mb-5 text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  Ready to Win a Surprise?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Enter your shipment details to unlock your scratch card.
                </p>
              </div>

              <div className="space-y-4">
                {/* Tracking ID */}
                <div>
                  <Input
                    label="Tracking ID"
                    name="tracking_id"
                    id="tracking_id"
                    type="text"
                    required
                    value={formData.tracking_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tracking_id: e.target.value,
                      })
                    }
                    placeholder="Enter your tracking ID"
                    error={errors?.tracking_id}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <Input
                    label="Phone Number"
                    name="phone_number"
                    id="phone_number"
                    type="tel"
                    inputMode="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone_number: e.target.value,
                      })
                    }
                    placeholder="Enter your registered phone number"
                    error={errors.phone_number}
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  label="Continue to Scratch"
                  loading={loading}
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                Your shipment details will be verified securely.
              </p>
            </form>
          ) : (
            /* STEP 2: Scratch Card */
            <>
              <div className="mb-4 text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  {revealed
                    ? "Congratulations! 🎉"
                    : "You have a reward waiting!"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {revealed
                    ? "You've unlocked an exclusive reward."
                    : "Use your finger or mouse to scratch and reveal your reward."}
                </p>
              </div>

              {/* Scratch Card */}
              <div
                className="relative overflow-hidden rounded-xl
                border-2 border-dashed border-yellow-400
                bg-linear-to-br from-yellow-50 to-orange-50"
              >
                {/* if no_gift is true, then show better luck next time message.*/}
                {scratchData?.no_gift ? (
                  <div className="flex h-40 flex-col items-center justify-center gap-2 sm:h-48">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Sorry, no reward this time
                    </span>

                    <h3 className="text-4xl font-black text-center text-[#1e2a6e] sm:text-5xl">
                      Better luck next time!
                    </h3>

                    <p className="text-sm font-medium text-gray-600">
                      Keep shipping with us for more chances to win.
                    </p>
                  </div>
                ) : 
                
                (
                    <>
                    {/* if no_gift is false, then show the scratch card with gift message. */}
                  <div
                    className="flex h-40 flex-col items-center
            justify-center gap-2 sm:h-48"
                  >
                    <span
                      className="text-xs font-semibold
            uppercase tracking-widest text-gray-500"
                    >
                      Your exclusive reward
                    </span>

                    <h3
                      className="text-4xl font-black text-[#1e2a6e]
            sm:text-5xl"
                    >
                      {scratchData?.gift || "Better luck next time!"}
                    </h3>

                    <p className="text-sm font-medium text-gray-600">
                      On your next shipment
                    </p>
                  </div>
                

                {!revealed && (
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={280}
                    onPointerDown={(e) => {
                      e.currentTarget.setPointerCapture(e.pointerId);
                      scratch(e);
                    }}
                    onPointerMove={(e) => {
                      if (e.buttons === 1) scratch(e);
                    }}
                    onPointerUp={checkScratch}
                    onPointerCancel={checkScratch}
                    className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
                  />
                )} 
                </>)}
              </div>

              {/* Reward Result */}
              {revealed ? (
                <div className="mt-5 space-y-3 text-center">
                  <div
                    className="rounded-lg border border-green-200
            bg-green-50 p-3"
                  >
                    <p className="text-xs font-medium text-green-700">
                      YOUR EXCLUSIVE REWARD
                    </p>

                    <p
                      className="mt-1 text-xl font-extrabold
              tracking-widest text-[#1e2a6e]"
                    >
                      {scratchData?.gift || "Better luck next time!"}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="success"
                    size="lg"
                    label="Claim Your Reward"
                    className="w-full"
                    onClick={(e) => handleClaim(e)}
                  />
                </div>
              ) : (
                <>
                {scratchData?.no_gift ? (
                  <div className="mt-5 text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      label="Close"
                      className="w-full"
                      onClick={onClose}
                    />
                  </div>
                ) : (
                  <div className="mt-5 text-center">
                    <div
                      className="inline-flex items-center gap-2
                    rounded-full bg-yellow-50 px-4 py-2
                    text-xs font-semibold text-yellow-700"
                    >
                      ✨ Scratch at least 40% to reveal
                    </div>
                  </div>
                )}
                </>
              )}
            </>
          )}
                

          <p
            className="mt-5 text-center text-[11px]
    leading-relaxed text-gray-400"
          >
            *Terms and conditions apply. Rewards are subject to campaign
            eligibility and validity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScratchWinModal;
