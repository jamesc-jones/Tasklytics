import { useState} from "react";
import { createTask } from "../api/api";

export default function CreateTask({ token, onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = async () => {
        if (!title.trim()) return;

        const task = {
            title,
            description,
            priority: "medium",
        };

        const res = await createTask(task, token);

        if (res.data){
            onTaskCreated(res.data);

            setTitle("");
            setDescription("");
        }
    };

    return (
        <div>
            <h3>Create Task</h3>

            <input 
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleCreate}>Add Task</button>
        </div>
    );
}