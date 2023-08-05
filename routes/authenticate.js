const express = require("express");
const router = express.Router();
const authenticateController = require("../controller/authenticate");
const passport = require('../auth/passport');


router.get('/',authenticateController.getCheckSession);

router.post('/login',passport.authenticate('local', { failureRedirect: '/api/authenticate' }),authenticateController.postCheckLogin);

router.get('/signup',authenticateController.getSignUp);

router.post('/signup',authenticateController.postCheckSignUp);

router.get('/logout',authenticateController.getLogOut);


module.exports = router;