import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  return (
    <div className="loginmaincontainer">
      <div className="logincontainer">
        <h1> Login </h1>
        <button className="signinbutton" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};
