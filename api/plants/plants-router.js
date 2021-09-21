const express = require("express")
const router = express.Router()
const helpers = require("./plants-model")

router.get("/", async (req, res, next) => {
  await helpers
    .getPlants()
    .then((plants) => {
      res.status(200).json(plants)
    })
    .catch(next())
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    const data = await helpers.getBy({ id })

    if (data) {
      return res.status(200).json(data)
    } else {
      res.status(400).json(`The plant with id ${id} could not be found`)
    }
  } catch {
    next()
  }
});

router.post("/", (req, res, next) => {
  helpers
    .createPlant(req.body)
    .then((plant) => {
      res.status(201).json(plant)
    })
    .catch(next())
});

module.exports = router 