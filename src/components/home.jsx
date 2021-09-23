import React, {useState, useEffect} from "react";
import {
    Redirect
} from "react-router-dom";
import { useExchangeMutation } from '../services/tracker.ts'
import Login from "./login";


export default function Home() {
    const [authed, setAuthed] = useState(!!localStorage.getItem("isAuthenticated"))

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeBody = {code}
    const [exchange] = useExchangeMutation(codeBody);

    useEffect(() => {
        async function exchangeCode() {
            return exchange(code).unwrap()
                .then(fulfilled => {
                    const jwt = fulfilled.jwt
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("jwt", jwt);
                    setAuthed(true);
                })
                .catch(rejected => {
                    console.error(rejected)
                });
        }

        if (!authed) {
            exchangeCode();
        }
    }, []);


    console.log('auth', authed)

    return authed ? (<Redirect to={{pathname:"/tasks"}}/>) : (<Login/>);
}