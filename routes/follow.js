const express = require("express");
const router = express.Router();
const followController = require("../controller/follow");

router.post('/follow/:id', followController.postUserFollow);

router.post('/unfollow/:id', followController.postUserUnfollow);

module.exports = router;