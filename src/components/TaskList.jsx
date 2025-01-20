import Task from "./Task";
import './TaskList.css';
import {useCallback, useMemo} from "react";
import React from "react";


const TaskList = React.memo(({title, tasks, status, handleOnClickTask, handleDropTask}) => {

    const filteredTasks = useMemo(() => {
            return tasks.filter((task) => task.status === status);
        }, [status, tasks])

    const handleDragStart = useCallback((event, task) => {
        event.dataTransfer.setData("application/json", JSON.stringify(task));
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, [])


    return( 
        <section
            className={`taskList ${status}`}
            onDragOver={handleDragOver}
            onDrop={(e) => {handleDropTask(e, status)}}>

            <header>
                <h3 className="title">{title}</h3>
            </header>
            <ul className="list">
                {filteredTasks.map((task) => (
                    <Task
                        key={task.id}
                        handleOnClickTask={handleOnClickTask}
                        task={task}
                        handleDragStart={handleDragStart}/>
                ))}

                <div className="create-new" ></div>
            </ul>
            
        </section>
    )
})
  
export default TaskList;