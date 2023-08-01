import React, { useContext } from "react";
import logo from "../assets/logo.png";
import UserContext from "../../context/userContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const {dataLoggin} = useContext(UserContext)
  
  return (
    <div>
      <div className="flex justify-center">
        <img src={logo} alt="La maison jungle" className="w-44" />
      </div>
      <nav className="border-b flex items-align shadow-b-[0px_px_5px_0px_#00000024] mb-6">
        <ul className="flex w-full gap-4 md:gap-16 font-light justify-center text-lg md:text-xl py-4 text-[#0E2C04] ">
        <NavLink to="/"> <li className="hover:bg-[#D4E1DB] duration-300 p-3 cursor-pointer">Accueil</li></NavLink>
            <li className="p-3 hidden md:block">|</li>
            <NavLink to="/plant_list">  <li className="hover:bg-[#D4E1DB] duration-300 p-3 cursor-pointer">Mes Plantes</li></NavLink>
            <li className="p-3 hidden md:block">|</li>
            <NavLink to={`/balcony/${dataLoggin}`}> <li className="hover:bg-[#D4E1DB] duration-300 p-3 cursor-pointer">Mon balcon</li></NavLink>
        </ul>
        {!dataLoggin ? (<div className="flex items-center">
        <NavLink to="/login">  <button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300">S'identifier</button></NavLink>
        </div>) : (<div className="flex items-center">
        <NavLink to="/profile">  <button className="border hover:bg-[#D4E1DB] border-[#0E2C04] w-28 p-3 duration-300">Mon Profil</button></NavLink>
        </div>)}
        
      </nav>
    </div>
  );
};

export default NavBar;
