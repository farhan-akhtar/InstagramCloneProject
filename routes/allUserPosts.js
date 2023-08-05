const express = require("express");
const router = express.Router();
const userPostsController = require("../controller/allUserPosts");

router.get('/', userPostsController.getAllUserPosts);


module.exports = router;