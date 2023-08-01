import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";



const Inscription = () => {
    const navigate = useNavigate();
   

    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const handleInput = (e) => {
      e.persist();
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const saveUser = (e) => {
      e.preventDefault();
  
      const data = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
  
      axios
        .post(`http://localhost:5005/users`, data)
        .then((res) => { console.log(res.data);
        
          navigate('/login')
        })
        .catch((err) => console.warn(err));
    };
  





    return (
        
        <div>
        <div className="bg-[#D4E1DB] w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
          <h2 className="text-4xl font-serif mb-6 text-center">Créer un compte</h2>
          <form encType="multipart/form-data" className="w-3/5  mx-auto flex flex-col" onSubmit={saveUser}>
            <label htmlFor="name">Votre prénom :</label>
            <input type="text" name="name" id="name" className='my-2'  value={user.name}
                  onChange={handleInput}/>
            <label htmlFor="email">Votre adresse email :</label>
            <input type="email" name="email" id="email" className='my-2'  value={user.email}
                  onChange={handleInput}/>
            <label htmlFor="mdp">Mot de passe :</label>
            <input type="password" name="password" className='my-2' id="mdp" value={user.password}
                  onChange={handleInput}/>
          
         
            <button
            type="submit"
            className=" w-30 mx-auto  mt-6 border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
          >
            OK !
          </button>
      
         
            </form></div>
        </div>
    );
};

export default Inscription;