import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <header className="text-center">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                    <div className="container d-flex flex-row justify-content-start ">
                        <NavLink className="nav-link px-2" to="/task">Tasks list</NavLink>
                        <NavLink className="nav-link px-2" to="/addtask">Add task</NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}