const Users = require('../models/Users');
const Posts = require('../models/Posts');

module.exports.getAllUserPosts = async (req,res)=>{
    let userId = req.user._id;
    let user = await Users.findOne({_id:userId}).populate('posts').sort({"posts.createdTime":-1});
    res.render('allposts',{
        data: user.posts
    })
}