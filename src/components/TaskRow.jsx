import { memo } from "react";

const TaskRow = memo(({ task }) => {

    return (
        <tr>
            <th scope="row">{task.id}</th>
            <td>{task.title}</td>
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
        </tr>
    );
})

export default TaskRow;

// export default function TaskRow(props) {
//     const { task } = props;

//     return (
//         <tr key={task.id}>
//             <th scope="row">{task.id}</th>
//             <td>{task.title}</td>
//             <td style={{
//                 backgroundColor: task.status == "To do"
//                     ? 'lightcoral'
//                     : task.status == "Doing"
//                         ? 'lightyellow'
//                         : 'lightgreen'
//             }}>
//                 {task.status}
//             </td>
//             <td>{new Date(task.createdAt).toLocaleString("it-IT")}</td>
//         </tr>
//     );
// }