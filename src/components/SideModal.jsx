import './SideModal.css'
import {FaAnglesRight} from "react-icons/fa6";
import {useSideModal} from "../context/SideModalContext";


function SideModal({children}) {
    const {isOpen, closeModal} = useSideModal();
    if (!isOpen) return null;

    return  (
        <div className="modal-overlay">
            <FaAnglesRight size={18} onClick={closeModal}/>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default SideModal;