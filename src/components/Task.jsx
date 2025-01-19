import './Task.css';


function Task({task, handleOnClickTask}) {
    return (
        <li key={task.id} className="task" onClick={() => {handleOnClickTask(task)}} draggable={"true"}>
            <span>{task.title}</span>
        </li>
    )
}

export default Task;