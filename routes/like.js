const express = require("express");
const router = express.Router();
const likeController = require("../controller/like");

router.post('/like/:id',likeController.postLike);

router.post('/unlike/:id',likeController.postUnlike);

module.exports = router;