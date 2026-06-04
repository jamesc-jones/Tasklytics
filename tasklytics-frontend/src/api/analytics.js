import { API_BASE } from "./config";

export const getAnalytics = async (token) => {
    const res = await fetch(`${API_BASE}/tasks/analytics`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return res.json();
}