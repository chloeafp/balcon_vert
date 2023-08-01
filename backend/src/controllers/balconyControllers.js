const models = require("../models");

const add = (req, res) => {
  const bal = req.body;

  models.balcony
    .add(bal)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const bal = {
    userId: req.params.userId,
    plantId: req.params.plant,
  };


  models.balcony
    .destroy(bal)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        console.warn("bien delete");
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
const read = (req, res) => {
  models.balcony
    .findByUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows.map((e) => Object.values(e)[0]));
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  add,
  destroy,
  read,
};
