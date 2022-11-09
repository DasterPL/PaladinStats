import { useEffect, useState } from "react";

const listeners = {};

export default function useLocalStorage(key, defaultValue = null) {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(key)) ?? defaultValue
    );

    useEffect(() => {
        setValue.addChangeListener = function (calback) {
            if (listeners[key] && Array.isArray(listeners[key])) {
                listeners[key].push(calback);
            } else {
                listeners[key] = [calback];
            }
        }

        localStorage.setItem(key, JSON.stringify(value));
        if (listeners[key] && Array.isArray(listeners[key])) {
            listeners[key].forEach(listener => {
                listener(value);
            });
        }

        return () => {
            delete listeners[key];
        }
    }, [value]);
    return [value, setValue];
}