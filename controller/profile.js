const Users = require('../models/Users');

module.exports.getMyProfile = async (req,res)=>{
    let userId = req.user._id;
    await Users.findById(userId)
    .then((user)=>{
        res.render('profile',{
            user
        });
    });
}

module.exports.getUserProfile = async (req,res)=>{
    let userId = req.params['id'];
    let currUserId = req.user._id;
    if( userId == currUserId){
        res.redirect('/api/user');
    }
    else{
        await Users.findById(userId)
        .then((user)=>{
        if(user.followers.includes(currUserId)){
            user.followButton = "Unfollow";
        }
        else{
            user.followButton = "Follow";
        }
        user.save();
        res.render('userprofile',{
            user
        });
    });
    }
}