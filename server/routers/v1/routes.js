const express = require("express");
const router = express.Router();


const workout = require("./workout/routers");
router.use("/workout", workout)

const exersise = require("./exercise/routers");
router.use("/exercise", exersise);

module.exports = router;