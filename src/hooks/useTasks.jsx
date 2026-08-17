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

    const addTask = () => { };

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