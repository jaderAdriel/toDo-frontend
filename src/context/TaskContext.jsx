import {createContext, useContext, useState} from "react";

const TaskContext = createContext(null);


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



export function TaskProdiver({ children }) {
    const [tasks, setTasks] = useState(taskList);

    const addTask = (newTask) => {
        setTasks((prevTasks) => {
            const existingTaskIndex = prevTasks.findIndex((task) => task.id === newTask.id);

            if (existingTaskIndex !== -1 ) {
                return prevTasks.map((task, index) => index === existingTaskIndex ? newTask : task);
            } else
                return [...prevTasks, newTask]
        })
    }

    const removeTask = (id) => {
        setTasks((prevTasks) => {
            return prevTasks.filter((task) => task.id !== id);
        })
    }

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) => {
            return prevTasks.map((task) => task.id === updatedTask.id ? updatedTask : task);
        })
    }

    return (
        <TaskContext.Provider value={{tasks, addTask, removeTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTask() {
    return useContext(TaskContext);
}