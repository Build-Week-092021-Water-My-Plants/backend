const router = require("express").Router()
const Users = require("./users-model.js")
const { checkUserExists } = require('./users-middleware')

router.get("/", (req, res, next) => {
  Users.get()
    .then(usersList => {
      res.status(200).json(usersList)
    })
    .catch(next)
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params
  Users.getById(id)
    .then(currentUser => {
      res.status(200).json(currentUser)
    })
    .catch(next)
}) 

router.get("/:id/plants", checkUserExists, (req, res, next) => {
  const { id } = req.params
  Users.getUserPlants(id)
    .then(selectedUser => {
      res.status(200).json(selectedUser)
    })
    .catch(next)
})

router.put("/:id", checkUserExists, (req, res, next) => {
  const { id } = req.params
  Users.update(id, req.body)
    .then(() => {
      res.status(200).json({message: "User info updated"})
    })
    .catch(() => {
      res.status(500).json({message: "Invalid change."})
    })
})
 
module.exports = router