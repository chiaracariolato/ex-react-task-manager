import { useState, useRef, useMemo, useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext";

export default function AddTask() {

    const [name, setName] = useState('');
    const descriptionRef = useRef();
    const statusRef = useRef();

    const { addTask } = useContext(GlobalContext);

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    const isNameValid = useMemo(() => {
        const charsNotValid = name.split("").some(char =>
            symbols.includes(char.toLowerCase()))

        return !charsNotValid && name.length > 0
    }, [name])

    const submit = async (e) => {
        e.preventDefault();

        if (!isNameValid ||
            !descriptionRef.current.value ||
            !statusRef.current.value
        ) {
            alert("Missing information");
            return;
        }

        try {
            await addTask({
                title: name,
                description: descriptionRef.current.value,
                status: statusRef.current.value,
            });

            alert("Task created successfully!");

            e.target.reset();
            setName("");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>

            <div className="container col-md-8 order-md-1">
                <h4 className="mb-3">Create new task</h4>
                <form onSubmit={submit}>
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="taskName" className="form-label">Task name</label>
                            <input type="text"
                                className="form-control"
                                id="taskName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {name.trim() && !isNameValid && (
                                <p style={{ color: isNameValid ? 'green' : 'red' }}>
                                    Input a valid name
                                </p>)}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" ref={statusRef} defaultValue="To do" required>
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                placeholder="Description"
                                ref={descriptionRef}
                                className='form-control'
                            />
                        </div>
                    </div>

                    <hr className="my-4" />
                    <div className="d-flex flex-row-reverse">
                        <button className="w-30 btn btn-primary btn-lg" type="submit">Add task</button>
                    </div>

                </form>
            </div>
        </>
    )
}