const express = require('express');
const{createUser, fetchUser, fetchUserById, updateUser} = require("../controllers/User")
const router = express.Router();

//routes
router.post("/",createUser);
router.get("/",fetchUser);
router.get("/:id",fetchUserById);
router.patch('/:id',updateUser);

module.exports = router;