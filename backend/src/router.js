const express = require("express");
const fs = require("fs");
const router = express.Router();


const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

const { hashPassword, verifyPassword, verifyToken } = require("./auth")

router.post("/api/cover", upload.single("cover"), (req, res) => {
    const { originalname } = req.file;
    console.log(req.file.originalname);
    const { filename } = req.file;
    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${originalname}`,
      (err) => {
        if (err) throw err;
  
        res.send(`./public/uploads/${originalname}`);
      }
    );
  });

const plantControllers = require("./controllers/plantControllers");
const typeControllers = require("./controllers/typeControllers");
const balconyControllers = require("./controllers/balconyControllers");
const userControllers = require("./controllers/userControllers");


// user
router.post('/users',hashPassword, userControllers.add)
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put('/users/:id/edit', userControllers.edit)
router.delete("/users/:id", userControllers.destroy);
router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);



// plants routes

router.get("/plants", plantControllers.browse);
router.get("/plants/:id", plantControllers.read);
router.post("/plants", verifyToken, plantControllers.add);
router.get("/plants/balcony/:user", plantControllers.getBalcony);
router.put("/plant/:id/edit", verifyToken, plantControllers.edit);
router.delete("/plant/:id", verifyToken, plantControllers.destroy);

// type routes

router.get("/types", typeControllers.browse);
router.get("/types/:id", typeControllers.read);


// balcony routes
router.post("/balcony/add", balconyControllers.add);
router.delete("/balcony/:userId/:plant", balconyControllers.destroy);
router.get("/balcony/:id/", balconyControllers.read);



module.exports = router;
