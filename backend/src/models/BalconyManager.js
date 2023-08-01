const AbstractManager = require("./AbstractManager");

class BalconyManager extends AbstractManager {
  constructor() {
    super({ table: "balcony" });
  }

  add(bal) {
    const { userId, plantId } = bal[0];

    return this.database.query(
      `INSERT INTO ${this.table} (user_id, plant_id) VALUES (?, ?)`,
      [userId, plantId]
    );
  }

  destroy(bal) {
    const { userId, plantId } = bal;

    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? and plant_id = ?`,
      [userId, plantId]
    );
  }

  findByUser(id) {
    return this.database
      .query(`SELECT plant_id from ${this.table} WHERE user_id=?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }
}

module.exports = BalconyManager;
