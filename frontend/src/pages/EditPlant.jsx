import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EditPlant = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRef = useRef(null)
  const { id } = useParams();
  const [plant, setPlant] = useState({
    name: "",
    image: "",
    description: "",
    sun: "",
    water: "",
    region: "",
  });

  const handleInput = (e) => {
    e.persist();
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5005/plants/${id}`)
      .then((res) => {
        setPlant(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("cette plante n'existe pas");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  }, [id]);

  const updatePlant = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
        console.warn(inputRef.current.files[0])
        formData.append("cover", inputRef.current.files[0]);
        setPlant({
            ...plant,

            cover: inputRef.current.files[0]
        })
        
        inputRef.current.files[0] && axios
      .post(`http://localhost:5005/api/cover`, formData).then((response) => {
        const file = encodeURIComponent(response.data.split("/").pop())
        const url = `http://localhost:5005/uploads/${file}`
        setPlant({ ...plant, image: url });
    axios
      .put(`http://localhost:5005/plant/${id}/edit`,{ ...plant, image: url }).then((response) => {console.log(response.data);  setIsSubmit(!isSubmit)});
        console.log(response.data)})
      .catch((err) => console.error(err));
  };

  return (
    <>
      {isSubmit ? (
        <div className="bg-[#D4E1DB] mx-auto w-1/3 h-60 rounded-md bg-opacity-60 p-6">
          <div className="flex flex-col items-center gap-12 justify-center pt-8">
            <h3 className="text-2xl font-serif">Plante modifiée !</h3>

            <button
              type="submit"
              className="w-1/4 border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
            >
              <Link to="/plant_list"> retour</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#D4E1DB] w-2/3  p-10 mx-auto rounded-md bg-opacity-60 mb-10">
          <h2 className="text-4xl font-serif">Modifier une plante</h2>
          <form action="" className="flex flex-col" onSubmit={updatePlant}>
            <label htmlFor="espece">Espèce :</label>
            <input
              type="text"
              name="name"
              id="espece"
              value={plant.name}
              onChange={handleInput}
            />
            <label htmlFor="image">Image :</label>
            <input
              type="file" name="image" id="image" ref={inputRef}
            />
            <label htmlFor="description" className="flex flex-col">
              Description :
              <input
                type="textarea"
                className="h-40 px-4 py-2 overflow-hidden"
                value={plant.description}
                onChange={handleInput}
                name="description"
                id="description"
              />
            </label>

            <label htmlFor="">Besoin en soleil</label>
            <select
              id="sun"
              name="sun"
              value={plant.sun}
              onChange={handleInput}
            >
              <option value="?" disabled selected>...</option>
              <option value="peu">un peu</option>
              <option value="moyen">moyen</option>
              <option value="beaucoup">beaucoup</option>
            </select>
            <label htmlFor="">Besoin en eau</label>
            <select
              id="water"
              name="water"
              value={plant.water}
              onChange={handleInput}
            >
             <option value="?" disabled selected>...</option>
              <option value="un peu">un peu</option>
              <option value="moyen">moyen</option>
              <option value="beaucoup">beaucoup</option>
            </select>
            <label htmlFor="">Région</label>
            <select
              id="region"
              name="region"
              value={plant.region}
              onChange={handleInput}
            >
                <option value="?" disabled selected>...</option>
              <option value="Tropicale">Tropicale</option>
              <option value="Aride">Aride</option>
              <option value="Tempérée">Tempérée</option>
              <option value="Désertique">Désertique</option>
              <option value="Méditerranéenne">Méditerranéenne</option>
            </select>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-1/4 border hover:bg-[#D4E1DB] border-[#0E2C04] p-3 duration-300"
              >
                Modifier une Plante
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPlant;
