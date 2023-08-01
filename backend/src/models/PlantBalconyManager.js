const AbstractManager = require("./AbstractManager");

class PlantBalconyManager extends AbstractManager {
  constructor() {
    super({ table: "plant_balcony" });
  }


  findAllFromPlant(id) {
    return this.database
      .query(
        [id]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }


  insert(plantBal) {
    const { balconyId, plantId } = plantBal;
    return this.database
      .query(`INSERT INTO ${this.table} (plant_id, balcony_id) VALUES (?,?)`, [
        plantId,
        balconyId,
      ])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  delete(id) {
    return this.database
      .query(`DELETE FROM ${this.table} WHERE plant_id = ?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to delete data from the database.");
      });
  }


  findBalconyName(id) {
    return this.database
      .query(
        `SELECT name from balcony INNER JOIN ${this.table} ON  ${this.table}.balcony_id =balcony.id WHERE balcony.id = ?`,
        [id]
      )
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  findBalconyId(id) {
    return this.database
      .query(`SELECT plant_id from ${this.table} WHERE balcony_id  =?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }


}
module.exports = PlantBalconyManager;
