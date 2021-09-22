const router = require("express").Router()
const Plants = require('./plants-model')
const { noMissingInformation, checkUserIdExists } = require('./plants-middleware')

router.get("/", (req, res, next) => {
  Plants.get()
    .then(plantsList => {
      res.status(200).json(plantsList);
    })
    .catch(next)
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params
  Plants.getById(id)
    .then(currentPlant => {
      res.status(200).json(currentPlant)
    })
    .catch(next)
})

router.put("/:id", (req, res, next) => {
  const { id } = req.params
  Plants.update(id, req.body)
    .then(()=> {
        Plants.getById(id)
            .then(updatedPlant => {
                res.status(200).json(updatedPlant)
            })
    })
    .catch(next)
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params
    Plants.remove(id)
        .then(removed => {
            res.status(200).json({message: "Plant was killed by magic"})
        })
        .catch(next)
})

router.post("/", noMissingInformation, checkUserIdExists, (req, res, next) => {
    const plant = req.body;
  
    Plants.add(plant)
      .then(addedPlant => {
        res.status(201).json(addedPlant)
      })
      .catch(next)
});

module.exports = router