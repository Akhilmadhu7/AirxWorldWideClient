// const handleErrorResponses = ({ errors }) => {

//   console.error("Login failed:", errors.response);
//   const status_code = errors.response.status || 500;
//   const error = errors?.response?.data?.detail || "An unknown error occurred.";
//   console.log("status code:", status_code);

//   if (status_code == 403) {
//     return error;
//   } 
//   else if (status_code == 422) {
//     console.error("errors", error);
//     const newErrors = {};
//     for (const item of error) {
//       console.log("error item:", item);
//       const errorLocation = item?.loc || "unknown";
//       newErrors[errorLocation[1]] = item?.msg || "Field required.";
//     }
//     return newErrors;
//   }
//   else if (status_code == 404) {
//     console.error(
//       "API endpoint not found. Please check the URL and try again.",
//     );
//     return error
//   }
//   else if (status_code == 400) {
//     console.error(
//       "Bad request. Please check the submitted data and try again.",
//     );
//     return error;
//   }
//   else {
//     return "An unknown error occurred.";
//   }
// };

// export default handleErrorResponses

const handleErrorResponses = (error) => {
  console.error("Request failed:", error?.response);

  // Network error or no response at all (e.g. server down, CORS)
  if (!error?.response) {
    return "Network error. Please check your connection and try again.";
  }

  const status_code = error?.status || 500;
  const detail = error?.data?.detail;

  console.log("status code:", status_code);

  if (status_code === 403) {
    return detail || "You don't have permission to perform this action.";
  }

  if (status_code === 422) {
    // FastAPI validation errors — detail is an array of field errors
    if (Array.isArray(detail)) {
      const newErrors = {};
      for (const item of detail) {
        const field = item?.loc?.[1] || "unknown";
        newErrors[field] = item?.msg || "Field required.";
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
