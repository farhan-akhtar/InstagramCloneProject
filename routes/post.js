const express = require("express");
const router = express.Router();
const postController = require("../controller/post");

router.get('/',postController.getAddPost);

router.post('/',postController.postAddPost);

router.get('/:id', postController.getSinglePost);

router.post('/:id', postController.postDeletePost);

module.exports = router;