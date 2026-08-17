import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <header className="text-center">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <NavLink className="nav-link" to="/">Tasks list</NavLink>
                        <NavLink className="nav-link" to="/addtask">Add task</NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}