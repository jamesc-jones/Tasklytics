import { API_BASE } from "./config";

// ---------------- TASK -------------------------

export const getTasks = async (token) => {
    const res = await fetch(`${API_BASE}/tasks/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
};


export const createTask = async (task, token) => {
    const res = await fetch(`${API_BASE}/tasks/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    return res.json()
}

export const updateTask = async (id, task, token) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    return res.json();
};

export const deleteTask = async (taskId, token) => {
    const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}` ,
        },
    });

    return res.json();
};