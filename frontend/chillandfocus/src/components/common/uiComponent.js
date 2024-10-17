const SimpleDropDown = ({ options, selectedId, onChange }) => {
    return (
        <select value={selectedId} onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
    
}