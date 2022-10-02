import { useEffect, useRef, useState } from "react";

const listeners = {};

export default function useLocalStorage(key, defaultValue=null) {
    const initialRender = useRef(true);
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    
    useEffect(()=>{
        value.addChangeListener = function(calback){
            if(listeners[key] && Array.isArray(listeners[key])){
                listeners[key].push(calback);
            }else{
                listeners[key]= [calback];
            }
        }
        if(initialRender.current){
            initialRender.current = false;
        }else{
            localStorage.setItem(key, JSON.stringify(value));
            if(listeners[key] && Array.isArray(listeners[key])){
                listeners[key].forEach(listener=>{
                    listener(value);
                });
            }
        }
    }, [value]);

    return [value, setValue];
}

