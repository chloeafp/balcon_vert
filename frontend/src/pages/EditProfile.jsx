import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";

const EditProfile = () => {
  const { id } = useParams();
 const {dataLoggin} = useContext(UserContext)
  const [isClicked, setIsClicked] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5005/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("cet utilisateur n'existe pas");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  }, [id]);

  console.log(user);

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    axios
      .put(`http://localhost:5005/users/${id}/edit`, data)
      .then((res) => {
        console.warn(res.data);
        setIsClicked(!isClicked);
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (e, id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5005/users/${id}`)
      .then((res) => {
        console.warn(res.data);
        setIsDelete(!isDelete);
        dataLoggin(undefined);
      })
      .catch((error) => console.error(error));
  };

  return (
    <> 
      {isDelete ? ( <div className="bg-[#D4E1DB] mx-auto w-1/3 h-60 rounded-md bg-opacity-60 p-6">
          <div className="flex flex-col items-center gap-12 justify-center pt-8">
            <h3 className="text-2xl font-serif">Profil supprimé !</h3>

            <button
              type="submit"
              className="w-1/4 border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
            >
              <Link to="/"> retour</Link>
            </button>
          </div>
        </div>) : isClicked ? (
        <div className="bg-[#D4E1DB] mx-auto w-1/3 h-60 rounded-md bg-opacity-60 p-6">
          <div className="flex flex-col items-center gap-12 justify-center pt-8">
            <h3 className="text-2xl font-serif">Profil modifié !</h3>

            <button
              type="submit"
              className="w-1/4 border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
            >
              <Link to="/profile"> retour</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#D4E1DB] w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
          <h3 className="text-2xl font-serif text-center ">
            Modifier mon profile
          </h3>

          <form className="" onSubmit={updateUser}>
            <label htmlFor="name" className="flex flex-col">
              {" "}
              Prénom
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="email" className="flex flex-col">
              {" "}
              Adresse e-mail
              <input
                id="email"
                name="email"
                type="text"
                value={user.email}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="password" className="flex flex-col">
              {" "}
              Mot de Passe
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleInput}
              />
            </label>

            <div className="flex items-center gap-6 mt-6">
              <button
                type="submit"
                className="border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
              >
                Modifier
              </button>
              <div className="flex items-center">
                <button className="border hover:bg-red-100 border-red-700 text-red-700 p-3 duration-300" onClick={(e)=>deleteUser(e, user.id)}>
                  Supprimer :(
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProfile;
