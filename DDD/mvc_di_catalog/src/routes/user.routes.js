const express = require("express");
const userController = require("../controllers/User.controller");

const router = express.Router();

router.get("/", userController.getusers);
router.post("/newuser", userController.createNewuser);

module.exports = router;
 