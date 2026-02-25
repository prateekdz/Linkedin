import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { login } from '../features/userSlice';
import './Login.css';
import logo from '../assets/logo-full.svg';

function Login() {
    const [name, setName] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(
            (userAuth) => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        photoURL: userAuth.user.photoURL,
                    })
                );
            }
        )
        .catch((err) => alert(err));
    };

    const register = () => {
        if (!name) {
            return alert("Please enter a full name!");
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then(
            (userAuth) => {
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profileUrl,
                })
                .then(() => {
                    dispatch(
                        login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                            photoURL: profileUrl,
                        })
                    );
                });
        })
        .catch((err) => alert(err));
    };
    
    return (
        <div className="login">
            <img src={logo} alt="" />

            <form>
                <input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Full Name (required for registration)" 
                    type="text" 
                />
                <input 
                    value={profileUrl} 
                    onChange={e => setProfileUrl(e.target.value)} 
                    placeholder="Profile Picture URL (optional)" 
                    type="text" 
                />
                <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    type="email" 
                />
                <input 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                    type="password" 
                />
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>
                New to LinkedIn?
                <span className="login__register" onClick={register}>
                    Register Now
                </span>
            </p>
        </div>
    );
}

export default Login;
