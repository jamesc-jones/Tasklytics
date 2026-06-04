import { API_BASE } from "./config";

export const getInsights = async (tasks, token) => {
    const res = await fetch(`${API_BASE}/ai/task-insights`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tasks }),
    });

    return res.json();
};