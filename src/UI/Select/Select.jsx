import React from 'react';
import { useEffect, useState } from 'react';
import './Select.css'

function Select({children, name, value, placeholder, className, onChange}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(() => {
        let documentListener = document.addEventListener("click", () => {setIsOpen(false)})
        
        return (
            () => {document.removeEventListener("click" ,documentListener)}
        )
    }, [value]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value])

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (newValue) => {
        onChange(newValue, name);
        setSelectedValue(newValue);
        setIsOpen(false);
    }

    return (
        <div 
            className = {`custom-select custom-select-${name} ${className}`} 
            onClick={toggleSelect}
            id={name}>

            <div className={`selected-option ${selectedValue}`}>
                {children.find((child) => child.props.value === selectedValue)?.props.children || placeholder }
            </div>

           
            {isOpen && 
                <div className={`options options-${name}`}>
                    {children
                        .filter((child) => child.props.value !== selectedValue)
                        .map((child) =>
                            React.cloneElement(child, {
                                onClick: () => handleOptionClick(child.props.value),
                            })
                        )
                    }
                </div>
            }

            <input type="hidden" name={name} id={name} value={value}/>
        </div>
    )
}

export default Select;