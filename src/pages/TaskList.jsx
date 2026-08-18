import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

function TaskList() {
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder * -1);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    };

    const sortedTasks = useMemo(() => {
        const sorted = [...tasks];

        sorted.sort((a, b) => {
            let comparison = 0;

            if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title);
            }

            if (sortBy === "status") {
                const statusOrder = {
                    "To do": 0,
                    "Doing": 1,
                    "Done": 2,
                };
                comparison = statusOrder[a.status] - statusOrder[b.status];
            }

            if (sortBy === "createdAt") {
                comparison =
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime();
            }

            return comparison * sortOrder;
        });

        return sorted;
    }, [tasks, sortBy, sortOrder]);

    return (
        <div className="container">
            <h2>Tasks list</h2>

            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col"
                                onClick={() => handleSort("title")}
                                style={{
                                    color: sortBy == "title" ? 'blue' : "black",
                                    textDecoration: sortBy == "title" ? 'underline' : "",
                                    cursor: "pointer"
                                }}>Title</th>
                            <th scope="col"
                                onClick={() => handleSort("status")}
                                style={{
                                    color: sortBy == "status" ? 'blue' : "black",
                                    textDecoration: sortBy == "status" ? 'underline' : "",
                                    cursor: "pointer"
                                }}>Status</th>
                            <th scope="col"
                                onClick={() => handleSort("createdAt")}
                                style={{
                                    color: sortBy == "createdAt" ? 'blue' : "black",
                                    textDecoration: sortBy == "createdAt" ? 'underline' : "",
                                    cursor: "pointer"
                                }}>Creation date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;