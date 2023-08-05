const User = require('../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getCheckSession = (req,res,next)=>{
    if(req.session.loggedIn){
        res.redirect('/api/home');
    }
    res.render('login');
}

module.exports.postCheckLogin = function (req, res) {
    req.session.loggedIn = true;
    res.redirect('/api/home');
}

module.exports.getSignUp = (req, res) => {
    res.render('signup');
}

module.exports.postCheckSignUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    let username = email;
    try {
        let user = await User.findOne({ username });
        if (user) {
            res.render('login', {
                msg: "User is Already Present"
            });
        }
        else {
            bcrypt.genSalt(saltRounds, async function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    await User.create({
                        fullname,
                        username,
                        password:hash
                    })
                    res.render('login', {
                        msg: "Signup Success"
                    });
                });
            });

        }
    }
    catch (err) {
        res.send(err);
    }
}

module.exports.getLogOut = (req,res)=>{
    req.session.destroy();
    res.redirect('/api/authenticate');
}
