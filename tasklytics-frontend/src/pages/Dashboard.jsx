import { useEffect, useState, useContext } from "react";
import { getTasks, deleteTask, updateTask } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CreateTask from "../components/CreateTask";

export default function Dashboard() {
    const { token, logoutUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        if(token) {
            loadTasks();
        }
    }, [token]);

    const loadTasks = async () => {
        const res = await getTasks(token);

        const tasksData = res?.data || res?.tasks || res;

        setTasks(Array.isArray(tasksData) ? tasksData : []);
    };

    const handleNewTask = (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleDelete = async (id) => {
        await deleteTask(id, token);
        setTasks((prev) => prev.filter((t) => t.id !== id));

        if (editingTask?.id === id) {
            cancelEdit();
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleUpdate = async () => {
        if (!editTitle.trim()) {
            alert("Title cannot be empty");
            return;
        }

        await updateTask(
            editingTask.id,
            {
                title: editTitle,
                description: editDescription
            },
            token
        );

        setEditingTask(null);
        loadTasks();
    };


    const cancelEdit = () => {
        setEditingTask(null);
        setEditTitle("");
        setEditDescription("");
    };

    return(
        <div>
            <h2>Dashboard</h2>

            <button onClick={logoutUser}>Logout</button>

            <CreateTask token={token} onTaskCreated={handleNewTask} />

            {editingTask && (
                <div style={{
                    border: "1px solid #aaa",
                    padding: 10,
                    marginBottom: 15,
                    borderRadius: 8
                }}>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            )}

            <h3>Tasks</h3>

            {tasks.length === 0 && <p>No tasks yet.</p>}

            {tasks.map((task) => (
                <div key={task.id} style={{ border: "1px solid #ccc", margin: 10 }}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>

                    <button onClick={() => handleEdit(task)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                        Delete
                    </button>
                    
                </div>
            ))}
        </div>
    );
}