import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { RiPlantLine } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";




const UnePlante = ({name, image, description, sun, water, region, id, setDataPlants}) => {


    const updatePLantList = () => {
        axios
          .get("http://localhost:5005/plants")
          .then((res) => setDataPlants(res.data))
          .catch((err) => console.error(err));
      };
    
      useEffect(() => {
        updatePLantList();
      }, []);

    const deleteVideo = (e, id) => {
        e.preventDefault();
    
        axios
          .delete(`http://localhost:5005/plant/${id}`)
          .then((res) => {
            console.warn(res.data);
            updatePLantList();
          })
          .catch((error) => console.error(error));
      };

    return (
        <div className='border border-[#0E2C04] w-1/4 p-3 relative hover:bg-[#D4E1DB] hover:bg-opacity-60 duration-300'>
            
            <h2 className='text-xl text-center font-semibold '>{name}</h2>
            <RiPlantLine className='text-2xl absolute top-1 right-1 text-green-900'/>
            <div className='flex justify-center'>
            <img src={image} alt={name} className='h-44' />
            </div>
            <div className='flex justify-between pt-4'>
                <p>Arrosage : {`${water === "un peu" ? "💧" : sun === "moyen" ? "💧💧" : "💧💧💧"}`}</p>
                <p>Ensoleillement :  {`${sun === "un peu" ? "☀️" : sun === "moyen" ? "☀️☀️" : "☀️☀️☀️"}`}</p>
            </div>
            <p className='pt-6 pb-12 text-sm'>{description}</p>
            <div className='flex items-center gap-4 absolute bottom-2 '>
            <button type="button" onClick={(e) => deleteVideo(e, id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 hover:scale-110  duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <Link to={`/plants/${id}/edit`}>
            
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 hover:scale-110  duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </Link>
              </div>
            
        </div>
    );
};

export default UnePlante;