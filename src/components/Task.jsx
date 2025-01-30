import './Task.css';
import { FaRegTrashCan } from "react-icons/fa6";
import {useTask} from "../context/TaskContext";



function Task({task, handleDragStart, onClick}) {

    const {removeTask} = useTask()

    const handleDeleteAction = (e) => {
        e.stopPropagation();
        removeTask(task.id);
        alert("Task deleted successfully");
    }

    return (
        <li
            key={task.id}
            className="task" onClick={() => {onClick(task)}}
            draggable="true"
            onDragStart={(e) => {handleDragStart(e, task)}}>

            <span>{task.title}</span>
            <div className="actions">
                <FaRegTrashCan  onClick={(e) => {handleDeleteAction(e)}}/>
            </div>
        </li>
    )
}

export default Task;