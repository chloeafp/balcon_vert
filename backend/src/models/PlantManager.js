const AbstractManager = require("./AbstractManager");

class PlantManager extends AbstractManager {
  constructor() {
    super({ table: "plant" });
  }



  getByBalcony(id) {
    const userId = id;

    return this.database
      .query(
        `SELECT * FROM ${this.table}
        INNER JOIN balcony ON plant_id = ${this.table}.id 
        WHERE user_id = ?`,
        [userId]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }



  insert(plant) {
    const {
      name,
      image,
      description,
      water,
      sun,
      region,
    } = plant;

    return this.database.query(
      `INSERT INTO ${this.table} (name, image, description, water, sun, region) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, image, description, water, sun, region]
    );
  }



  update(plant) {
    const {
      id,
      name,
      image,
      description,
      water,
      sun,
      region,
    } = plant;
    return this.database.query(
      `UPDATE ${this.table} SET name=?, image=?, description=?, water=?, sun=?, region=? WHERE id=?`,
      [
        name,
        image,
        description,
        water,
        sun,
        region,
        id,
      ]
    );
  }



}

module.exports = PlantManager;