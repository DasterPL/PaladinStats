import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function ErrorNavigate({ error, code }) {
    const navigate = useNavigate();
    const errorCode = error?.response?.status || error || code || null;
    console.log(error);
    useEffect(() => {
        switch (errorCode) {
            case 403:
                navigate(`/error/403`);
                break;
            case 404:
                navigate(`/error/404`);
                break;
            case 500:
                navigate(`/error/500`);
                break;
            default:
                navigate(`/error/500`);
                break;
        }
    });
    return <></>
}