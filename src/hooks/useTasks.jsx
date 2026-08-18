import { useState, useEffect } from 'react'

function useTasks() {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        fetch(`${import.meta.env.VITE_BE_APP}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error));
        console.log("dati presi")
        // Perchè stampa "Dati presi" due volte???
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
            })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        setTasks(prevTasks => [...prevTasks, data.task]);

        return data.task;
    };

    const removeTask = async (taskId) => {
        const response = await fetch(`${import.meta.env.VITE_BE_APP}/tasks/${taskId}`, {
            method: "DELETE"
        })

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        const deletedTask = tasks.find(task => task.id === taskId);

        setTasks((prevTasks) => prevTasks.filter((task) => task.id != taskId));

        return deletedTask;

    };

    const updateTask = async (updatedTask) => {
        console.log("TASK TO UPDATE:", updatedTask);
        const response = await fetch(`${import.meta.env.VITE_BE_APP}/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
            })
        })

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? data.task : task
            )
        );


        return data.task;
    };

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
    };
}

export default useTasks;