import { useEffect, useState, useCallback} from "react";
import debounce from 'lodash/debounce'

const useFecthPromise = (query,  transformData, promise, debounceWait) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)

    const fetchData = useCallback(debounce(async(query, transformData, signal) => {
        try {

            const response = await promise(query, signal);
            if(!response.ok) {
                throw new Error(response.statusText)
            }

            const data = await response.json();
            console.log(data);
            setData(transformData(data))
        } catch (error) {
            console.log(error);
            if(!signal.aborted) {
                setError(error)
            }
        }
    },debounceWait), [])

    useEffect(() => {
        if(!query) {
            setData(null)
            setError(null)
            return 
        }
        const controller = new AbortController();
        const signal = controller.signal
        fetchData(query, transformData, signal)

        return () => controller.abort()
    }, [query, transformData, fetchData, debounceWait])

    return [data, setData, error]
}

export default useFecthPromise