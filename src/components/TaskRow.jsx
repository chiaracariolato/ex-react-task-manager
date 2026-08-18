import { memo } from "react";
import { Link } from "react-router-dom"

const TaskRow = memo(({ task }) => {

    return (
        <tr>
            <th scope="row">{task.id}</th>
            <td><Link to={`/task/${task.id}`} style={{ color: 'black' }}> {task.title} </Link>
            </td>
            <td style={{
                backgroundColor: task.status == "To do"
                    ? 'lightcoral'
                    : task.status == "Doing"
                        ? 'lightyellow'
                        : 'lightgreen'
            }}>
                {task.status}
            </td>
            <td>{new Date(task.createdAt).toLocaleString("it-IT")}</td>
        </tr >
    );
})

export default TaskRow;
