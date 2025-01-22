import './Task.css';
import { FaRegTrashCan } from "react-icons/fa6";
import {useTask} from "../context/TaskContext";



function Task({task, handleOnClickTask, handleDrop, handleDragStart, handleDragOver}) {

    const {removeTask} = useTask()

    const handleDeleteAction = () => {
        removeTask(task.id);
    }

    return (
        <li
            key={task.id}
            className="task" onClick={() => {handleOnClickTask(task)}}
            draggable="true"
            onDragStart={(e) => {handleDragStart(e, task)}}>

            <span>{task.title}</span>
            <div className="actions">
                <FaRegTrashCan  onClick={() => {handleDeleteAction()}}/>
            </div>
        </li>
    )
}

export default Task;