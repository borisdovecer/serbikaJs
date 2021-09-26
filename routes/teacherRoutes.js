const express = require('express');
const router = express.Router();
const teacher = require("../controllers/teacherController.js");

router.get("/", teacher.findAll);

router.post("/", teacher.create);

router.get("/:id", teacher.findOne);

router.put("/:id", teacher.update);

router.delete("/:id", teacher.delete);

module.exports = router;
