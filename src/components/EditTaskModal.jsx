import { useState, useRef, useEffect, useMemo } from "react"
import Modal from "./Modal"

export default function EditTaskModal({
    show, onClose, task, onSave
}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To do');

    const editFormRef = useRef(null);

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task, show]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!isNameValid) return;

        console.log("FORM DATA:", {
            ...task,
            title,
            description,
            status,
        });
        onSave({
            ...task,
            title,
            description,
            status,
        });
    }

    const isNameValid = useMemo(() => {
        const charsNotValid = title.split("").some(char =>
            symbols.includes(char.toLowerCase()))

        return !charsNotValid && title.length > 0
    }, [title])

    return <Modal
        title="Edit task"
        content={
            <form ref={editFormRef} onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="taskName" className="form-label">Task name</label>
                        <input type="text"
                            className="form-control"
                            id="taskName"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        {title.trim() && !isNameValid && (
                            <p style={{ color: isNameValid ? 'green' : 'red' }}>
                                Input a valid name
                            </p>)}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required>
                            <option>To do</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='form-control'
                        />
                    </div>
                </div>

            </form>
        }
        show={show}
        onClose={onClose}
        onConfirm={() => editFormRef.current.requestSubmit()}
        confirmText="SAVE"
    />
} 