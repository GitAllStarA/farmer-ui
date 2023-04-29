import { useState, useEffect } from "react";


function UseDebounce(value, delay) {
    const [debounce, setDebounce] = useState(value);

    useEffect(()=> {
        const handle = setTimeout(()=>{
            setDebounce(value);
        },delay);
    
        return () => {
            clearTimeout(handle);
        };
    
    },[value,delay]);

    return debounce;


}

export default UseDebounce;