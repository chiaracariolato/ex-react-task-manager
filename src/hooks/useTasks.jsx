import { useState, useEffect } from 'react'
import axios from "axios";

function useTasks() {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get(`${import.meta.env.VITE_BE_APP}/tasks`)
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }

    useEffect(fetchTasks, []);

    const addTask = async ({ title, description, status }) => {
        const response = await fetch(`${import.meta.env.VITE_BE_APP}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                status,
            }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        setTasks(prevTasks => [...prevTasks, data.task]);

        return data.task;
    };

    const removeTask = () => { };

    const updateTask = () => { };

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
    };
}

export default useTasks;