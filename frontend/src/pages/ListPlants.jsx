import React, { useState, useEffect, useContext } from "react";
import UnePlante from "../components/UnePlante";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";

const ListPlants = () => {
  const { dataLoggin } = useContext(UserContext);

  const [dataPlants, setDataPlants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/plants")
      .then((res) => setDataPlants(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {!dataLoggin ? (
        <div className="bg-[#D4E1DB] mx-auto w-1/3 h-60 flex flex-col items-center gap-12 justify-center rounded-md bg-opacity-60 p-6">
          <h3 className="text-2xl font-serif text-center">
            Oops, tu n'as pas de compte :(
          </h3>

          <button
            type="submit"
            className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
          >
            <NavLink to="/inscription">S'inscrire</NavLink>
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center mb-8 ">
            <button className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300">
              <NavLink to="/add_plant">Ajouter une Plante</NavLink>
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-5 pb-20">
            {dataPlants.map((plant) => {
              return (
                <UnePlante
                  name={plant.name}
                  image={plant.image}
                  description={plant.description}
                  sun={plant.sun}
                  water={plant.water}
                  region={plant.region}
                  id={plant.id}
                  dataPlants={dataPlants}
                  setDataPlants={setDataPlants}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ListPlants;
