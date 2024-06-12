"use client";

// React
import React, { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Next
import { useRouter } from 'next/navigation';

// Redux
import { useAppDispatch, useAppSelector } from "../store/hook";
import { addToken } from "@/app/login/TokenSlice";

// In-Project
import './style.scss';

export default function Page() {
    const [accessToken, setAccessToken] = useState(null);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetch('http://localhost:3001/refresh_token', {
    //             method: 'POST',
    //             credentials: 'include'
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.accessToken) {
    //                     setAccessToken(data.accessToken);
    //                 }
    //             })
    //             .catch(error => console.error('Error refreshing token:', error));
    //     }, 5 * 60 * 1000); // 1 min refresh - access token

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className='container'>
            <Title />
            <LoginForm setAccessToken={setAccessToken} />
        </div>
    );
}

const Title = () => {
    return (
        <div className='title-flex'>
            <div className='title-cyber'>
                Glucose Data @ Visualization
            </div>
            <div className='title-sign'>
                Sign in to your account
            </div>
            <div className='sub-title-flex'>
                <div className='title-help'>
                    Need help?
                </div>
                <div className='title-know'>
                    Here is ALL you need to know
                </div>
            </div>
        </div>
    )
}

const LoginForm = (handleAccessToken: any) => {
    const { setAccessToken } = handleAccessToken;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isSubmited, setIsSubmited] = useState(false);

    const handleSubmit = async (e: any) => {
        if (!isSubmited) {
            e.preventDefault();

            setIsSubmited(true);

            const formData = new FormData(e.target);
            const userEmail = formData.get("userEmail");
            const userPassword = "7h5aJCH9BKo*KS-"; // hard coded since this is for demo use only

            const res = await fetch("https://hi2l2g8jte.execute-api.eu-west-3.amazonaws.com/genJWT", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail, userPassword })
            })

            const data = await res.json();

            if (res.ok) {
                if (data.accessToken) {
                    setAccessToken(data.accessToken);
                    dispatch(addToken(data.accessToken));
                    router.push('/detail');
                }
            } else {
                alert(data.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                <li>
                    <label htmlFor="email">Email address</label>
                    <input required type="email" id="email" name="userEmail" />
                </li>
                <li>
                    <label className="cursor-not-allowed" htmlFor="password">Password <span className="text-slate-500 cursor-not-allowed">(coming soon)</span></label>
                    <input className="cursor-not-allowed" disabled type="password" id="password" name="userPassword" />
                </li>
                <SubPassword />
                <li>
                    {!isSubmited ? <button type="submit">Request access</button> : <button className="cursor-not-allowed bg-slate-500" disabled>Requested</button>}
                </li>
            </ul>
        </form>
    )
}

const SubPassword = () => {
    const label = <span className='remember-me text-slate-500 cursor-not-allowed'>Remember me</span>;
    return (
        <div className='subPassword-flex'>
            <FormControlLabel sx={{ '& .MuiTypography-root': { lineHeight: "15px" } }} disabled control={<Checkbox size="small" sx={{ '& .MuiSvgIcon-root': { fontSize: 14, color: "gray" } }} />} label={label} />
            <div className='forgot cursor-not-allowed'>Forgot Password?</div>
        </div>
    )
}