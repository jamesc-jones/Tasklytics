import { useEffect, useState, useContext } from "react";
import { getTasks, deleteTask, updateTask } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import CreateTask from "../components/CreateTask";

import { toast } from "react-toastify";

import Analytics from "../components/Analytics";

export default function Dashboard() {
    const { token, logoutUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCompleted, setEditCompleted] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(token) {
            loadTasks();
        }
    }, [token]);

    const loadTasks = async () => {
        setLoading(true);

        const res = await getTasks(token);

        const tasksData = res?.data || res?.tasks || res;

        setTasks(Array.isArray(tasksData) ? tasksData : []);

        setLoading(false);
    };

    const handleNewTask = (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
        toast.success("Task created! ✅");
    };

    const handleDelete = async (id) => {
        try{
            await deleteTask(id, token);

            setTasks((prev) => prev.filter((t) => t.id !== id));

            toast.info("Task Deleted! 🗑️");

            if (editingTask?.id === id) {
                cancelEdit();
            }
        } catch (err) {
            console.error("Error deleting task", err);
            toast.error("Failed to delete task! ❌")
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditCompleted(task.completed ?? false);
    };

    const handleUpdate = async () => {
        if (!editTitle.trim()) {
            toast.error("Title cannot be empty ❌");
            return;
        }

        console.log("Sending update:", {
            title: editTitle,
            description: editDescription,
            completed: editCompleted
        });

        try{
        await updateTask(
            editingTask.id,
            {
                title: editTitle,
                description: editDescription,
                completed: editCompleted
            },
            token
        );

        setEditingTask(null);
        loadTasks();
        toast.success("Task updated! ✏️");

    } catch (err) {
        console.error("Error updating task:", err);
        toast.error("Failed to update task. Please try again ❌");
     }
    };

    const cancelEdit = () => {
        setEditingTask(null);
        setEditTitle("");
        setEditDescription("");
        setEditCompleted(false);
    };

    const toggleComplete = async (task) => {
        try {
            const newStatus = !task.completed

            await updateTask(
                task.id,
                {
                    ...task,
                    completed: !task.completed
                },
                token
            );

            // update UI instantly without refetching
            setTasks((prev) => 
                prev.map((t) => 
                    t.id === task.id ? { ...t, completed: newStatus } : t
                )
            );

            toast.success(
                newStatus ? "Task completed! 🎉" : "Marked incomplete"
            );

        } catch (err) {
            console.error("Error toggling task:", err);
            toast.error("Error toggling task! ❌");
        }
    };

    if (loading){
        return (
            <div className="notepad">
                <h2>Dashboard</h2>
                <p>Loading tasks...</p>
            </div>
        );
    }

    return(
        <div className="notepad">
            <h2>Dashboard</h2>

            <button onClick={logoutUser}>Logout</button>

            {/* CREATE TASK */}
            <CreateTask token={token} onTaskCreated={handleNewTask} />

            {/* ANALYTICS */}
            <Analytics />


            {/* EDIT SECTION */}
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
                <label>
                    <input
                    type="checkbox"
                    checked={editCompleted}
                    onChange={(e) => setEditCompleted(e.target.checked)}
                    />
                    Completed
                </label>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            )}

            <h3>Tasks</h3>

            {tasks.length === 0 && (
                    <p>Create your first task!</p>
                )}

            {tasks.map((task) => (
                <div key={task.id} 
                     style={{ 
                        border: "1px solid #ccc", 
                        marginBottom: 15,
                        padding: 10,
                        borderRadius: 8
                         }}
                    >
                    <h4 style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        opacity: task.completed ? 0.6 : 1
                    }}>
                        {task.title}
                    </h4>

                    <p style={{
                        textDecoration: task.completed ? "line-through" : "none"
                    }}>
                        {task.description}
                    </p>

                    <button onClick={() => toggleComplete(task)}>
                        {task.completed ? "Undo" : "Complete"}
                    </button>
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
