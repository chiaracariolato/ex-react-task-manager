import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from 'react-router-dom'
import Modal from "../components/Modal";

export default function TaskDetail() {
    const { tasks, removeTask } = useContext(GlobalContext);
    const { id } = useParams();

    const navigate = useNavigate();

    const task = tasks.find(task => task.id == id);

    const [show, setShow] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!task && !showSuccess) {
            navigate("/task");
        }
    }, [task, showSuccess, navigate]);

    async function deleteTask(id) {
        setShow(false);

        try {
            await removeTask(id);
            setShowSuccess(true);
        } catch (error) {
            setErrorMessage(error.message);
            setShowError(true);
        }

        console.log('task deleted')
    }

    if (!task && !showSuccess) {
        return null;
    }

    return (
        <div className="container">
            {task && (
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
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.description}</p>
                        <p>{new Date(task.createdAt).toLocaleString("it-IT")}</p>
                        <button className="btn btn-primary" onClick={() => setShow(true)}>
                            Delete
                        </button>
                    </div>
                </div>
            )}

            <Modal
                title="Delete task"
                content={task ? `Are you sure you want to delete the task "${task.title}"?` : ""}
                show={show}
                onClose={() => setShow(false)}
                onConfirm={() => deleteTask(id)}
            />

            <Modal
                title="Task deleted"
                content="Task deleted successfully!"
                show={showSuccess}
                onClose={() => { setShowSuccess(false); navigate("/task"); }}
                onConfirm={() => { setShowSuccess(false); navigate("/task"); }}
                confirmText="OK"
                showCancel={false}
            />

            <Modal
                title="Error"
                content={errorMessage}
                show={showError}
                onClose={() => setShowError(false)}
                onConfirm={() => setShowError(false)}
                confirmText="OK"
                showCancel={false}
            />
        </div>
    )
}