import './TaskModal.css'
import {FaAnglesRight} from "react-icons/fa6";


function TaskModal({children, onSave, handleCloseModal, isOpen}) {


    if (!isOpen) return null;

    return  (
        <div className="modal-overlay">
            <FaAnglesRight size={18} onClick={() => { handleCloseModal()}}/>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default TaskModal;