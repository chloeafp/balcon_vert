const models = require("../models");

const browse = (req, res) => {
  models.plant
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.plant
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const plant = req.body;

  plant.id = parseInt(req.params.id, 10);

  models.plant
    .update(plant)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const plant = req.body;

  models.plant
    .insert(plant)
    .then(([result]) => {
      res.location(`/plant/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.plant
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const getBalcony = (req, res) => {
  const userId = parseInt(req.params.user, 10)

  if (Number.isNaN(userId)) {
    res.sendStatus(400);
    return;
  }

  models.plant
    .getByBalcony(userId)
    .then(([rows]) => {
      const plantData = rows.map((row) => {
        return {
          id: row.id,
          image: row.image,
        };
      });
      res.json(plantData);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};








 


module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getBalcony,
};
