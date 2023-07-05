import { useState, useEffect } from "react";
import { AbortController } from 'node-abort-controller';  //! install first using npm / yarn

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //! useEffect Cleanup
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error("Could not fetch the data for that resource!");
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data)
                    setIsPending(false);
                    setError(null);
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(error.message);
                    }
                });
        }, 1000)

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;