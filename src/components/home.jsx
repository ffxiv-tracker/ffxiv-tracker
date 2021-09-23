import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import { useExchangeMutation } from '../services/tracker.ts'


export default function Home() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeBody = {code}
    const [exchange] = useExchangeMutation(codeBody);

    const authed = localStorage.getItem("isAuthenticated")
    console.log('auth', authed)
    if(!authed){
        if (!code) {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                    }}
                />
            );
        } else {
            exchange(code).unwrap()
            .then(fulfilled => {
                const jwt = fulfilled.jwt
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("jwt", jwt);

                return (
                    <Redirect
                        to={{
                            pathname: "/tasks",
                        }}
                    />
                );
            })
            .catch(rejected => {
                console.error(rejected)

                return (
                    <pre>Auth failed: ${rejected.toString()}</pre>
                )
            });
        }
    } else {
        return (
            <Redirect
                to={{
                    pathname: "/tasks",
                }}
            />
        );
    }
}