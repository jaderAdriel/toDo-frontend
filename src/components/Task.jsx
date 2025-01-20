import './Task.css';


function Task({task, handleOnClickTask, handleDrop, handleDragStart, handleDragOver}) {
    return (
        <li
            key={task.id}
            className="task" onClick={() => {handleOnClickTask(task)}}
            draggable="true"
            onDragStart={(e) => {handleDragStart(e, task)}}>

            <span>{task.title}</span>
        </li>
    )
}

export default Task;