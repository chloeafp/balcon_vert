import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserContext from "../../context/userContext";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const { setDataLoggin } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5005/api/login", {email, password}, {headers:{ "Content-Type": "application/json" }})
      .then((response) => {console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          const decoded = jwt_decode(response.data.token);
          console.log(decoded);
          setDataLoggin(decoded.sub);
          navigate("/");
        } else {
          throw new Error("throw-error level, Error during login attempt");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



 
  return (
    <>
    
        <div className="bg-[#D4E1DB] w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
          <div className="flex gap-12 mb-10">
            <h1 className="text-4xl font-serif text-center w-1/3">Bienvenu <span className="text-2xl">sur</span> <br /> Balcon Vert !</h1>
            <form className='w-3/5 mx-auto flex flex-col justify-center items-center' onSubmit={handleSubmit}>
              <label htmlFor="email" className='flex flex-col w-full py-3'>Email:
                <input type="email" id="email" className='my-3 p-1' name="email" placeholder='Votre email...' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </label>
              <label htmlFor="mdp" className='flex flex-col w-full pb-6'>Mot de passe:
                <input type="password" id="mdp" className='my-3 p-1' placeholder='Votre mot de passe...' name="password" value={password} required onChange={(e) => setPassword(e.target.value)}></input>
              </label>
              <button type="submit" className="border border-[#0E2C04] p-3 hover:bg-white duration-300">S'identifier</button>
            </form>
          </div>
        </div>
  
    </>
  );
};

export default Login;
