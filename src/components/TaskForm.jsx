import { useEffect, useState } from 'react';
import './TaskForm.css'
import {Select, Option} from './../UI/Select'
import { FaTasks, FaClock, FaHourglassEnd, FaAlignLeft } from 'react-icons/fa';

function TaskForm({task, onSubmit, mode, handleCloseModal}) {


    const [formState, setFormState] = useState({
        task_id: task.id,
        task_title: task.title || "",
        task_status: task.status || "to-do",
        task_creation_date: task.creation_date || getCurrentDate(),
        task_deadline: task.deadline || "",
        task_description: task.description || "",
        formMode: mode
    });


    function getCurrentDate() {
        const now = new Date();
        return now.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
    }

    const handleInputChange = (e) => {
        const name = e.target.getAttribute("name");
        const value = e.target.value;
        setFormState({...formState, [name]: value})
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    }

    useEffect(() => {
        document.getElementById("task_title").focus();

        setFormState({
            task_id: task.id,
            task_title: task.title || "",
            task_status: task.status || "to-do",
            task_creation_date: task.creation_date || getCurrentDate(),
            task_deadline: task.deadline || "",
            task_description: task.description || "",
            formMode: mode
        });

    }, [task, mode]);
    
    return (
        <form className='form' onSubmit={handleOnSubmit}>
            <div className="form-group">
                <label htmlFor="task_title" hidden>Title</label>
                <input
                    type="text"
                    name="task_title"
                    id="task_title"
                    value={formState.task_title}
                    placeholder="Task title"
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group grid">
                <div className="label-wrapper area-a">
                    <FaTasks size={18}/>
                    <label>Status</label>
                </div>

               <Select name="task_status" className="area-b" value={formState.task_status} placeholder="Select the status" onChange={(value, name) => {setFormState({...formState, [name]: value})}}>
                    <Option value="to-do" className="option to-do" key="to-do"> <div> To do </div></Option>
                    <Option value="doing" className="option doing" key="doing"><div> Doing</div></Option>
                    <Option value="done" className="option done" key="done"><div> Done </div></Option>
               </Select>

            </div>

            <div className="form-group grid">
                <div className="label-wrapper area-a">
                    <FaClock size={18} />
                    <label htmlFor="task_creation_date" >Creation date</label>
                </div>
                <input type="datetime-local" className="area-b" name="task_creation_date" id="task_creation_date" value={formState.task_creation_date} onChange={handleInputChange} />
            </div>

            <div className="form-group grid">
                <div className="label-wrapper area-a">
                    <FaHourglassEnd size={18} />
                    <label htmlFor="task_deadline" >Deadline</label>
                </div>
                <input type="datetime-local" className="area-b" name="task_deadline" id="task_deadline" value={formState.task_deadline} onChange={handleInputChange}/>
            </div>

            <div className="form-group description-field ">
                <div className="label-wrapper">
                    <FaAlignLeft size={18} />
                    <label htmlFor="task_description" >Description</label>
                </div>
                <textarea name="task_description" id="task_description" value={formState.task_description} onChange={handleInputChange}></textarea>
            </div>


            <div className="actions">
                <div className="option cancel">
                    <input type="reset" value="Cancel" onClick={handleCloseModal}/>
                </div>
                <div className="option save">
                    <input type="submit" value="Save" />
                </div>
            </div>
        </form>    
    )
    
}

export default TaskForm;