import { createContext, useContext, useState} from "react";
import './../components/SideModal';

const SideModalContext = createContext(null);

export function SideModalProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = (callback) => {
        setIsOpen(false);
    }

    return (
        <SideModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
        </SideModalContext.Provider>
    )
}

export function useSideModal() {
    return useContext(SideModalContext)
}