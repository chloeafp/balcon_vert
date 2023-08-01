import React, {useContext, useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";

const Accueil = () => {

  const { dataLoggin } = useContext(UserContext);
  const [user, setUser] = useState([])

 useEffect(() => {axios.get(`http://localhost:5005/users/${dataLoggin && dataLoggin}`)
.then((response) => setUser(response.data))
.catch((error) =>console.error(error))},[dataLoggin])
    

  return (
    <>
    {!dataLoggin ? (<header className="bg-[#D4E1DB] md:w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
    <div className="md:flex md:gap-12 md:mb-10">
      <h1 className="text-4xl font-serif text-center ">Bienvenue <span className="text-2xl">sur</span> <br /> Balcon Vert !</h1>
      <p className="pt-10 md:pt-20">
        Vous rêvez d'un balcon verdoyant et florissant, mais vous manquez
        d'espace extérieur ? Ne vous inquiétez pas, car nous sommes là pour
        réaliser votre rêve botanique au cœur de la ville !
      </p>
      <p className="pt-10 md:pt-40">
        {" "}
        Vous pourrez choisir parmi une vaste sélection de plantes tropicales,
        désertiques, succulentes et bien d'autres encore. Laissez-vous inspirer
        par nos suggestions de compositions végétales, ou laissez libre cours à
        votre créativité en personnalisant votre balcon virtuel selon vos goûts
        et vos envies.
      </p>
      </div>
      <div className="flex items-center gap-6 mt-6 md:mt-0">
        <NavLink to="/inscription"> <button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300">Je crée un compte !</button></NavLink>
      </div>
        
    </header>) :(<header className="bg-[#D4E1DB] md:w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
    <div className="md:flex md:gap-12 md:mb-10">
      <h1 className="text-2xl font-serif text-center ">Heureux de te retrouver <span className="text-2xl font-bold">{user.name}</span></h1>
      <p className="pt-10 md:pt-20">
        Vous rêvez d'un balcon verdoyant et florissant, mais vous manquez
        d'espace extérieur ? Ne vous inquiétez pas, car nous sommes là pour
        réaliser votre rêve botanique au cœur de la ville !
      </p>
      <p className="pt-10 md:pt-40">
        {" "}
        Vous pourrez choisir parmi une vaste sélection de plantes tropicales,
        désertiques, succulentes et bien d'autres encore. Laissez-vous inspirer
        par nos suggestions de compositions végétales, ou laissez libre cours à
        votre créativité en personnalisant votre balcon virtuel selon vos goûts
        et vos envies.
      </p>
      </div>
     <div className="flex items-center gap-6 mt-6 md:mt-0">
      <NavLink to="/add_plant"><button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300">J'ajoute une plante</button></NavLink>
         <div className="flex items-center">
         <NavLink to="/balcony">  <button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300">Mon balcon</button></NavLink>
        </div></div>
        
    </header>)}
    
    </>
  );
};

export default Accueil;
