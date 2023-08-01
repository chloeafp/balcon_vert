import React from 'react';
import { Routes, Route} from "react-router-dom";
import Accueil from '../components/Accueil';
import AddPlant from '../pages/AddPlant';
import EditPlant from '../pages/EditPlant';
import ListPlants from '../pages/ListPlants';
import Balcony from '../pages/Balcony';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Inscription from '../pages/Inscription';
import EditProfile from '../pages/EditProfile';


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/plant_list" element={<ListPlants />} />
            <Route path="/add_plant" element={<AddPlant />} />
            <Route path="/plants/:id/edit" element={<EditPlant />} />
            <Route path="/balcony/:id" element={<Balcony />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/inscription" element={<Inscription/>}></Route>
            <Route path="/users/:id/edit" element={<EditProfile />} />
        </Routes>
    );
};

export default Router;