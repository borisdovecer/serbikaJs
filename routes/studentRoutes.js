const express = require('express');
const router = express.Router();
const student = require("../controllers/studentController.js");

router.get("/", student.findAll);

router.post("/", student.create);

router.get("/:id", student.findOne);

router.put("/:id", student.update);

router.delete("/:id", student.delete);

module.exports = router;
