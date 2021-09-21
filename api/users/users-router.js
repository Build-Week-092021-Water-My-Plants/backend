const express = require("express");
const router = express.Router();
const Users = require("./users-model");

router.get("/", async (req, res, next) => {
  await Users
    .getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next());
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await Users.getBy({ id });

    if (data) {
      return res.status(200).json(data);
    } else {
      res.status(400).json(`The user with id ${id} could not be found`);
    }
  } catch {
    next();
  }
});



module.exports = router; 