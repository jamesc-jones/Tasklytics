import { useEffect, useState, useContext } from "react";
import { getTasks } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { token, logoutUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await getTasks(token);
            setTasks(data.data);
        };

        loadTasks();
    }, [token]);

    return(
        <div>
            <h2>Dashboard</h2>

            <button onClick={logoutUser}>Logout</button>

            {tasks.map((task) => (
                <div key={task.id}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}