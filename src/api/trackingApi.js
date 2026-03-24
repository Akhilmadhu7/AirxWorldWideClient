export const trackShipmentAPI = async ({ awb_number, courier_type }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}v1/delivery/status`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        awb_number: awb_number,
        courier_type: courier_type,
      }),
    }
  );

  const data = await response.json(); // ← always parse first

  if (!response.ok) {
    // backend error response body is now available
    throw new Error(
      data?.detail ||
      data?.message ||
      data?.Response?.ErrorDisc ||
      "Tracking failed. Please try again."
    );
  }

  return data?.data;
};