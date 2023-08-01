import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import { NavLink } from "react-router-dom";

const Balcony = () => {
  const { dataLoggin } = useContext(UserContext);

  const [plant, setPlant] = useState([]);
  const [balcony, setBalcony] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/plants")
      .then((res) => setPlant(res.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/plants/balcony/${dataLoggin}`, [
        { userId: dataLoggin },
      ])
      .then((res) => {
        setBalcony(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddBalcony = (e) => {
    e.preventDefault();
    if (balcony) {
      balcony.map((plant) => {
        axios
          .post(`http://localhost:5005/balcony/add`, [
            { userId: idUserLogged, plantId: plant.id },
          ])
          .then((res) => console.warn(res.data))
          .catch((error) => console.error(error));
      });
    }
  };

  const handleCheck = (e) => {
    const plantId = e.target.id;
    let plantOnBal = [];
    if (e.target.checked) {
      axios.get(`http://localhost:5005/plants/${plantId}`).then((res) => {
        plantOnBal = {
          ...plantOnBal,
          id: res.data.id,
          image: res.data.image,
        };
        setBalcony([...balcony, plantOnBal]);

      });
    } else {
      let newBalcony = [];
      newBalcony = balcony.filter(
        (plant) => parseInt(plant.id, 10) !== parseInt(plantId, 10)
      );
      setBalcony(newBalcony);
    }
  };

  const deletePlantFromBalcony = (e, id) => {
    e.preventDefault();
    
        axios
          .delete(`http://localhost:5005/balcony/${dataLoggin}/${id}`)
          .then((res) => {
            console.warn(res.data);
          })
          .catch((error) => console.error(error));

  }


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
        <div className="flex gap-8">
          <div className="w-1/3">
            <form onSubmit={handleAddBalcony}>
              <div className="flex">
                {plant.map((plant) => {
                  return (
                    <div className="" key={plant.id}>
                      <label htmlFor={plant.id}>
                        {" "}
                        <img src={plant.image} alt="" className="h-28 border" />
                        <p>{plant.name}</p>
                        <input
                          id={plant.id}
                          name="name"
                          type="checkbox"
                          onChange={handleCheck}
                      
                        ></input>
                      </label>
                    </div>
                  );
                })}
              </div>
              <button
                type="submit"
                className=" w-30 mx-auto  mt-6 border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
              >
                OK !
              </button>
            </form>
          </div>
          <div className="bg-[#D4E1DB] w-2/3 p-10 rounded-md bg-opacity-60 mb-10 ">
            <h1 className="text-2xl font-serif text-center ">
              Les plantes sur ton balcon
            </h1>
            <div className="flex">
              {balcony &&
                balcony.map((e) => {
                  return (
                    <div className="text-center">
                      <img src={e.image} alt="" className="h-28 border" />
                      <button type="button" onClick={(event) => deletePlantFromBalcony(event, e.id)}>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 text-red-600 hover:scale-110  duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
      
                    </div>

                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Balcony;
