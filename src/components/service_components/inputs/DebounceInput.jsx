import { useEffect, useState } from "react"

export const DebounceInpunt = ({value, onChange, delay = 1000, ...props}) => {
    const [inputValue, setInputValue] = useState(value)

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            onChange(inputValue)
        }, delay)
        return () => clearTimeout(timeoutId)
    }, [inputValue, delay, onChange])

    return (
        <input className="customInput" style={{padding: "0px"}}
                {...props}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
    )
}