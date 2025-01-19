import TaskList from "./TaskList";
import './TaskBoard.css';
import TaskModal from "./TaskModal";
import {useState, useCallback, useRef} from "react";
import TaskForm from "./TaskForm";

const taskList = [
    {
      id: 1,
      title: "Estudar React",
      description: "Aprender os conceitos básicos do React, como componentes, estado e props.",
      creationDate: "2025-01-10",
      deadline: "2025-01-20T23:59",
      status: "to-do"
    },
    {
      id: 2,
      title: "Finalizar relatório",
      description: "Completar o relatório de performance do projeto de 2024.",
      creationDate: "2025-01-12",
      deadline: "2025-01-20T23:59",
      status: "doing"
    },
    {
      id: 3,
      title: "Reunião com a equipe",
      description: "Discussão sobre as próximas etapas do projeto.",
      creationDate: "2025-01-13",
      deadline: "2025-01-14",
      status: "done"
    },
    {
      id: 4,
      title: "Organizar eventos de lançamento",
      description: "Planejar e organizar os eventos de lançamento do produto.",
      creationDate: "2025-01-14",
      deadline: "2025-01-30",
      status: "to-do"
    },
    {
      id: 5,
      title: "Fazer exercícios físicos",
      description: "Praticar 30 minutos de exercício cardiovascular.",
      creationDate: "2025-01-12",
      deadline: "2025-01-13",
      status: "done"
    }
  ];
  

function TaskBoard() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({})
    const formMode = useRef("CREATE");

    const [tasks, setTasks] = useState(taskList);
    

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

    const handleNewTask = () => {
      setModalIsOpen(true);
      setSelectedTask({});
      formMode.current = "CREATE";
    }

    console.log("Renderixou taskModal")

    const handleOnSubmitTaskForm = useCallback((taskFormState) => {
        const newTask = {
            id: taskFormState.task_id || tasks.length + 1, title: taskFormState.task_title, description: taskFormState.task_description,
            creation_date: taskFormState.task_creation_date, deadline: taskFormState.task_deadline, status: taskFormState.task_status,
        };

        setTasks((prevTasks) => {
            const existingTaskIndex = prevTasks.findIndex((task) => task.id === newTask.id);
            console.log(newTask, existingTaskIndex)
            if (existingTaskIndex !== -1 ) {
                return prevTasks.map((task, index) => index === existingTaskIndex ? newTask : task);
            } else
                return [...prevTasks, newTask]
        })

        handleCloseModal();
    }, [tasks, handleCloseModal])


    return (
        <section className="taskBoard">
            <header>
                <h1 className="title">My tasks</h1>
                <button className="button-new-task" onClick={handleNewTask}>New</button>
            </header>

            <div className="taskList-wrapper">
              <TaskList title="To Do" tasks={tasks} status="to-do" handleOnClickTask={handleOnClickTask}/>
              <TaskList title="Doing" tasks={tasks} status="doing" handleOnClickTask={handleOnClickTask} />
              <TaskList title="Done" tasks={tasks} status="done" handleOnClickTask={handleOnClickTask}/>
            </div>

            <TaskModal handleCloseModal={handleCloseModal} isOpen={modalIsOpen}>
                <TaskForm task={selectedTask} onSubmit={handleOnSubmitTaskForm} mode={formMode.current} handleCloseModal={handleCloseModal} />
            </TaskModal>
        </section>
    )
}

export default TaskBoard;