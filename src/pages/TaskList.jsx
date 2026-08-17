import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function TaskList() {
    const { tasks } = useContext(GlobalContext);

    return (
        <div>

        </div>
    );
}

export default TaskList;