const express = require('express');
const router = express.Router();
const session = require("../controllers/sessionController.js");

router.get("/", session.findAll);

router.post("/", session.create);

router.get("/:id", session.findOne);

router.put("/:id", session.update);

router.delete("/:id", session.delete);

module.exports = router;
