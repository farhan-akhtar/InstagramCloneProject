const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment");

router.get('/:id',commentController.getComments);

router.post('/',commentController.postComment);

module.exports = router;