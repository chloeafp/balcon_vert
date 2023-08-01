const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { id, name, email, hashedPassword } = user;

    return this.database.query(
      `INSERT INTO ${this.table} (id, name, email, hashedPassword ) VALUES (?, ?, ?, ?)`,
      [id, name, email, hashedPassword ]
    );
  }

  update(user) {
    const { name, email, hashedPassword, id } = user;

    return this.database.query(
      `UPDATE ${this.table} SET name=?, email=?, hashedPassword=? WHERE id=?`,
      [name, email, hashedPassword, id]
    );
  }

  findByMail(email) {
    return this.database
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

  findByID(id) {
    return this.database
      .query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to retrieve data from the database.");
      });
  }

}

module.exports = UserManager;