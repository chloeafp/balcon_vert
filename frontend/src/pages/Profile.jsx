import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../../context/userContext';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';


const Profile = () => {
    const navigate = useNavigate()
    const {dataLoggin, setDataLoggin} = useContext(UserContext)
    const [user, setUser] = useState([])

useEffect(() => {axios.get(`http://localhost:5005/users/${dataLoggin}`)
.then((response) =>setUser(response.data)) 
.catch((error) =>console.error(error))},[dataLoggin])
    
const handleLogout = () => {
    setDataLoggin(undefined);
    navigate('/')

}

    return (

        <div className="bg-[#D4E1DB] w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
        <h3 className="text-2xl font-serif text-center ">Mon profile</h3>
        
        <form className=''>
            <label htmlFor="name" className='flex flex-col'> Prénom
                <input id="name" type="text" value={user.name} disabled className=' bg-slate-100 '></input>
            </label>
            <label htmlFor="email" className='flex flex-col'> Adresse e-mail
                <input id="email" type="text" value={user.email} disabled className=' bg-slate-100 ' />
            </label>
            <label htmlFor="password" className='flex flex-col'> Mot de Passe
                <input id="password" type="password" value={user.password} disabled className=' bg-slate-100 '/>
            </label>

        </form>

        <div className="flex items-center gap-6 mt-6">
      <NavLink to={`/users/${user.id}/edit`}><button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300">Modifier</button></NavLink>
         <div className="flex items-center">
       <button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300" onClick={handleLogout}>Deconnexion</button>
    </div></div>

            
        </div>
    );
};

export default Profile;