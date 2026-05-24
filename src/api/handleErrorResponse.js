// export default handleErrorResponses

const handleErrorResponses = (error) => {
  console.error("Request failed:", error?.response);

  // Network error or no response at all (e.g. server down, CORS)
  if (!error?.response) {
    return "Network error. Please check your connection and try again.";
  }

  const status_code = error?.status || 500;
  const detail = error?.response?.data?.detail;
  console.log("status code:", detail);
  console.log("status code:", status_code);

  if (status_code === 403) {
    return detail || "You don't have permission to perform this action.";
  }
  
  if (status_code == 422) {
    console.error("errors", detail);
    const newErrors = {};
    for (const item of detail) {
      console.log("error item:", item);
      const errorLocation = item?.loc || "unknown";
      newErrors[errorLocation[1]] = item?.msg || "Field required.";
    }
    console.log("newErrors", newErrors);
    return newErrors;
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
