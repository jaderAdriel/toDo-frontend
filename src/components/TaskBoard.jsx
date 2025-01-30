import TaskList from "./TaskList";
import './TaskBoard.css';
import SideModal from "./SideModal";
import {useCallback} from "react";
import TaskForm from "./TaskForm";

import {useTask} from "../context/TaskContext";
import {useSideModal} from "../context/SideModalContext";

function TaskBoard() {
    const { openModal } = useSideModal();
    const {tasks, addTask, setSelectedTask} = useTask();

    const handleOnSubmitTaskForm = useCallback((taskForm) => {
        const newTask = {
            ...taskForm,
            id: taskForm.id || tasks.length + 1
        };
        addTask(newTask);
    }, [addTask, tasks.length]);

    const handleNewTask = useCallback((status = "to-do") => {
        openModal();
        setSelectedTask({status});
    }, [openModal, setSelectedTask]);


    return (
        <section className="taskBoard">
            <header>
                <h1 className="title">My tasks</h1>
                <button className="button-new-task" onClick={() => handleNewTask()}>New</button>
            </header>

            <div className="taskList-wrapper">
              <TaskList title="To Do" tasks={tasks} status="to-do" onNewTask={handleNewTask}/>
              <TaskList title="Doing" tasks={tasks} status="doing" onNewTask={handleNewTask}/>
              <TaskList title="Done" tasks={tasks} status="done" onNewTask={handleNewTask}/>
            </div>

            <SideModal>
                <TaskForm onSubmit={handleOnSubmitTaskForm}/>
            </SideModal>
        </section>
    )
}

export default TaskBoard;