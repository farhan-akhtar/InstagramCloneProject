const express = require("express");
const router = express.Router();
const profileController = require("../controller/profile");

router.get('/', profileController.getMyProfile);

router.get('/:id', profileController.getUserProfile);

module.exports = router;