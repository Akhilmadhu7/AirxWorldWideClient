// export default handleErrorResponses

const handleErrorResponses = (error) => {
  console.error("Request failed:", error?.response);

  // Network error or no response at all (e.g. server down, CORS)
  if (!error?.response) {
    return "Network error. Please check your connection and try again.";
  }

  const status_code = error?.status || 500;
  const detail = error?.response?.data?.details;
  console.log("status code:", detail);
  console.log("status code:", status_code);

  if (status_code === 403) {
    return detail || "You don't have permission to perform this action.";
  }

  if (status_code === 422) {
    // FastAPI validation errors — detail is an array of objects with string key and list of error messages as value
    if (Array.isArray(detail)) {
      const newErrors = {};
      for (const item of detail) {
        const key = Object.keys(item)[0];
        const messages = item[key];
        newErrors[key] = Array.isArray(messages) ? messages[0] : messages;
      }
      return newErrors;
    }
    return detail || "Validation error. Please check your input.";
  }

  if (status_code === 404) {
    return detail || "Resource not found.";
  }

  if (status_code === 400) {
    return detail || "Bad request. Please check your input.";
  }

  if (status_code === 401) {
    return detail || "Unauthorized. Please log in again.";
  }

  return detail || "An unknown error occurred.";
};

export default handleErrorResponses;
