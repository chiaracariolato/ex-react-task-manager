import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useParams, useNavigate } from 'react-router-dom'
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);
    const { id } = useParams();

    const navigate = useNavigate();

    const task = tasks.find(task => task.id == id);

    const [show, setShow] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [showEdit, setShowEdit] = useState(false);

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

    async function handleSave(updatedTask) {

        try {
            await updateTask(updatedTask);
            alert("Task edited succesfully");
            setShowEdit(false);
        } catch (error) {
            alert(error.message);
        }
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
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-outline-primary" onClick={() => setShow(true)}>
                                Delete
                            </button>
                            <button className="btn btn-primary" onClick={() => setShowEdit(true)}>
                                Edit
                            </button>
                        </div>
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

            <EditTaskModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                task={task}
                onSave={handleSave}
            />
        </div>
    )
}