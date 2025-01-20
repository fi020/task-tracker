import axios from "axios";

const apiUrl = process.env.VUE_APP_API_URL;

export const fetchTasks = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw error;
  }
};

export const deleteTask = async (taskId, token) => {
  try {
    await axios.delete(`${apiUrl}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
};
