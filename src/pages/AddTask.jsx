import { useState, useRef, useMemo } from "react"

export default function AddTask() {

    const [name, setName] = useState('');
    const descriptionRef = useRef('');
    const statusRef = useRef('To do');

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    const isNameValid = useMemo(() => {
        const charsNotValid = name.split("").every(char =>
            symbols.includes(char.toLowerCase()))

        return !charsNotValid && name.length > 0
    }, [name])

    const submit = (e) => {
        e.preventDefault()
        if (isNameValid &&
            descriptionRef.current.value &&
            statusRef.current.value
        ) {
            console.log(
                `Task name: ${name}
            Description: ${descriptionRef.current.value}
            Status: ${statusRef.current.value}
            `
            )
        } else {
            alert("Missing information")
            console.log('Missing information')
        }
    }

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
                                required />
                            {name.trim() && !isNameValid && (
                                <p style={{ color: isNameValid ? 'green' : 'red' }}>
                                    Input a valid username
                                </p>)}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" ref={statusRef} required>
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
                                ref={descriptionRef}
                                required
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