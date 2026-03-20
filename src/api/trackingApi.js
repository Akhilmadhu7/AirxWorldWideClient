export const trackShipmentAPI = async ({ awbNo, type }) => {
  const response = await fetch(
    "https://cloud.atlanticcourier.net/api/v1/Tracking/Tracking",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserID: import.meta.env.VITE_ATLANTIC_USER_ID ?? "WORLD5N",
        Password: import.meta.env.VITE_ATLANTIC_PASSWORD ?? "WORLD25",
        AWBNo: awbNo,
        // Type: type === "awb" ? "A" : "O",
        Type: type === "awb",
      }),
    }
  );
  if (!response.ok) throw new Error("Tracking failed. Please try again.");
  return response.json();
};