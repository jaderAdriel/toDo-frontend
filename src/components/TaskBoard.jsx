import TaskList from "./TaskList";
import './TaskBoard.css';
import TaskModal from "./TaskModal";
import {useState, useCallback, useRef} from "react";
import TaskForm from "./TaskForm";

import {useTask} from "../context/TaskContext";

function TaskBoard() {

    const {tasks, addTask, removeTask, updateTask} = useTask();
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({})
    const formMode = useRef("CREATE");

    const handleOnClickTask = useCallback((task) => {
      setModalIsOpen(true);
      setSelectedTask(task);
      formMode.current = "UPDATE";
    }, []);

    const handleCloseModal = useCallback(() => {
      setModalIsOpen(false);
      setSelectedTask({});
      formMode.current = "CREATE";
    }, []);

    const handleDropTask = useCallback((event, status) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("application/json");
        const updatedTask = JSON.parse(data);
        updatedTask.status = status;
        updateTask(updatedTask);
    }, [updateTask])

    const handleNewTask = useCallback((status = "to-do") => {
      setModalIsOpen(true);
      setSelectedTask({status});
      formMode.current = "CREATE";
    }, [])

    const handleDeleteTask = useCallback((id) => {
        removeTask(id);
    }, [removeTask]);

    const handleOnSubmitTaskForm = useCallback((taskFormState) => {
        const newTask = {
            id: taskFormState.task_id || taskFormState.length + 1, title: taskFormState.task_title, description: taskFormState.task_description,
            creation_date: taskFormState.task_creation_date, deadline: taskFormState.task_deadline, status: taskFormState.task_status,
        };

        addTask(newTask);
        handleCloseModal();

    }, [handleCloseModal, addTask])


    return (
        <section className="taskBoard">
            <header>
                <h1 className="title">My tasks</h1>
                <button className="button-new-task" onClick={handleNewTask}>New</button>
            </header>

            <div className="taskList-wrapper">
              <TaskList title="To Do" tasks={tasks} status="to-do" handleOnClickTask={handleOnClickTask} handleDropTask={handleDropTask} handleNewTask={handleNewTask} />
              <TaskList title="Doing" tasks={tasks} status="doing" handleOnClickTask={handleOnClickTask} handleDropTask={handleDropTask} handleNewTask={handleNewTask}/>
              <TaskList title="Done" tasks={tasks} status="done" handleOnClickTask={handleOnClickTask} handleDropTask={handleDropTask} handleNewTask={handleNewTask}/>
            </div>

            <TaskModal handleCloseModal={handleCloseModal} isOpen={modalIsOpen}>
                <TaskForm task={selectedTask} onSubmit={handleOnSubmitTaskForm} mode={formMode.current} handleCloseModal={handleCloseModal} />
            </TaskModal>
        </section>
    )
}

export default TaskBoard;