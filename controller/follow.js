const Users = require('../models/Users');

module.exports.postUserFollow = async (req,res)=>{
    const currUserId = req.user._id;
    const userId = req.params['id'];
    let currUser = await Users.findOne({_id:currUserId});
    let user = await Users.findOne({_id:userId});
    currUser.following.push(user._id);
    user.followers.push(currUser._id);
    currUser.save();
    user.save();
    res.redirect(`/api/user/${userId}`);
}

module.exports.postUserUnfollow = async (req,res)=>{
    const currUserId = req.user._id;
    const userId = req.params['id'];
    let currUser = await Users.findOne({_id:currUserId});
    let user = await Users.findOne({_id:userId});
    const followerIndex = user.followers.indexOf(currUser._id);
    user.followers.splice(followerIndex,1);
    const followingIndex = currUser.following.indexOf(user._id);
    currUser.following.splice(followingIndex,1);
    currUser.save();
    user.save();
    res.redirect(`/api/user/${userId}`);
}