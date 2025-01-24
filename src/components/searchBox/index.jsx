import React, { useState } from 'react'
import useFecthPromise from './useFetchPromise'

export const SearchBox = ({
    id,
    label,
    name,
    placeholder,
    autocomplete,
    maxItems,
    styles,
    debounceWait,
    listBox,
    noItemMessage,
    errorMessage,
    transformData,
    promise
}) => {
    const [query, setQuery] = useState("")
    const [data, setData, error] = useFecthPromise(query,  transformData, promise, debounceWait)
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <br/>
            <input 
                name={name} 
                placeholder={placeholder} 
                className={styles.input}
                id={id}
                value={query}
                onChange={handleChange}
            />
            {data && data.length>0 && listBox(data)}
        </div>
    )
}

