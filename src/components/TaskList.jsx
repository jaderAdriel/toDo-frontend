import Task from "./Task";
import './TaskList.css';
import { useMemo } from "react";
import React from "react";


const TaskList = React.memo(({title, tasks, status, handleOnClickTask}) => {

    const filteredTasks = useMemo(() => {
            return tasks.filter((task) => task.status === status);
        }, [status, tasks])

    

    return( 
        <section className={`taskList ${status}`}  >
            <header>
                <h3 className="title">{title}</h3>
            </header>
            <ul className="list">
                {filteredTasks.map((task) => (
                    <Task key={task.id} handleOnClickTask={handleOnClickTask} task={task}/>
                ))}
            </ul>
            
        </section>
    )
})
  
export default TaskList;