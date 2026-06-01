import { useEffect, useState, useContext } from "react";
import { getTasks, deleteTask } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CreateTask from "../components/CreateTask";

export default function Dashboard() {
    const { token, logoutUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, [token]);

    const loadTasks = async () => {
        const res = await getTasks(token);
        setTasks(Array.isArray(res.data) ? res.data : []);
    };

    const handleNewTask = (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleDelete = async (id) => {
        await deleteTask(id, token);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return(
        <div>
            <h2>Dashboard</h2>

            <button onClick={logoutUser}>Logout</button>

            <CreateTask token={token} onTaskCreated={handleNewTask} />

            <h3>Tasks</h3>

            {tasks.length === 0 && <p>No tasks yet.</p>}

            {tasks.map((task) => (
                <div key={task.id} style={{ border: "1px solid #ccc", margin: 10 }}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>

                    <button onClick={() => handleDelete(task.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}