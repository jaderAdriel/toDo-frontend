
function Option({value, children, onClick, className, key}) {
    return (
        <div className={className} data-value={value} onClick={onClick} key={key}>
            {children}
        </div>
    )
}

export default Option;