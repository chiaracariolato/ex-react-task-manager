import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useParams, Navigate } from 'react-router-dom'

export default function AddTask() {
    const { tasks } = useContext(GlobalContext);
    const { id } = useParams();

    const task = tasks.find(task => task.id == id);

    if (!task) {
        return <Navigate to="/task" />;
    }

    function deleteTask() {
        console.log('task deleted')
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    Task id: {task.id}

                    <span className={
                        task.status == "To do"
                            ? 'badge rounded-pill bg-danger'
                            : task.status == "Doing"
                                ? 'badge rounded-pill bg-warning'
                                : 'badge rounded-pill bg-success'
                    }> {task.status}</span>


                </div>
                <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-text">{task.description}</p>
                    <p>{new Date(task.createdAt).toLocaleString("it-IT")}</p>
                    <button className="btn btn-primary" onClick={deleteTask}>
                        Delete
                    </button>
                </div>
            </div>

        </div >
    )
}