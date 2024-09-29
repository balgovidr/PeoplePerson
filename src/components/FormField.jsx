export function FormField({fields, setFields, fieldName, type, required = false}) {

    function convertToReadable(fieldName) {
        const replaced = fieldName.replaceAll('_', ' ')
        const capitalised = replaced[0].toUpperCase() + replaced.slice(1)
        const final = capitalised + ':'

        return final
    }

    if (type == 'textarea') {
        return (
            <div className="flex flex-col">
                <label htmlFor={fieldName} className='text-left'>{convertToReadable(fieldName)}</label>
                <textarea id={fieldName} className='border-b border-gray-500 outline-none' value={fields[fieldName]} onChange={(e) => setFields({...fields, [fieldName]: e.target.value})}></textarea>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={fieldName} className='text-left'>{convertToReadable(fieldName)}</label>
            <input type={type} id={fieldName} className='border-b border-gray-500 outline-none' value={fields[fieldName]} onChange={(e) => setFields({...fields, [fieldName]: e.target.value})} required = {required} />
        </div>
    )
}