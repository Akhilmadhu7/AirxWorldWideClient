export const createCustomerQuote = async ({ payload }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}v1/customer-quote`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("API error response:", data);

    if (response.status === 422 || response.status >= 500) {
      throw new Error("Something went wrong. Please try again later.");
    }

    const message =
      data?.detail ||
      data?.message ||
      data?.Response?.ErrorDisc ||
      "Failed to submit quote. Please try again.";

    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }

  return data?.data;
};