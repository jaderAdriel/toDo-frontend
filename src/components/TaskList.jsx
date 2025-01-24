import Task from "./Task";
import './TaskList.css';
import {useCallback, useMemo} from "react";
import React from "react";
import {FaPlus} from "react-icons/fa6";
import {useSideModal} from "../context/SideModalContext";
import {useTask} from "../context/TaskContext";


const TaskList = React.memo(({title, status, onNewTask}) => {

    const {openModal} = useSideModal();
    const {tasks, updateTask, setSelectedTask} = useTask();

    const handleOnClickTask = useCallback((task) => {
        openModal();
        setSelectedTask(task);
    }, [setSelectedTask, openModal]);


    const filteredTasks = useMemo(() => {
            return tasks.filter((task) => task.status === status);
        }, [status, tasks]);

    const handleDragStart = useCallback((event, task) => {
        event.dataTransfer.setData("application/json", JSON.stringify(task));
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleDropTask = useCallback((event, status) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("application/json");
        const updatedTask = JSON.parse(data);
        updatedTask.status = status;
        updateTask(updatedTask);
    }, [updateTask]);

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
                        onClick={handleOnClickTask}
                        task={task}
                        handleDragStart={handleDragStart}/>
                ))}

                <div className="create-new-button" onClick={() => {onNewTask(status)}}>
                    <FaPlus size={18} /> <span>New Task</span>
                </div>
            </ul>
            
        </section>
    )
})
  
export default TaskList;