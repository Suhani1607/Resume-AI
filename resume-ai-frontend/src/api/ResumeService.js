import axios from "axios";

export const baseURL = "https://resume-ai-p644.onrender.com";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateResume = async (description) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/resume/generate",
      {
        userDescription: description,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Resume generation error:", error);

    if (error.response) {
      console.error("Backend response:", error.response.data);
    }

    throw error;
  }
};