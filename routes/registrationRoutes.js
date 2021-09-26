const express = require('express');
const router = express.Router();
const registration = require("../controllers/registrationController.js");

router.get("/", registration.findAll);

router.post("/", registration.create);

router.get("/:id", registration.findOne);

router.put("/:id", registration.update);

router.delete("/:id", registration.delete);

module.exports = router;
