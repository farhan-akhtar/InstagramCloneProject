const Posts = require('../models/Posts');
const Users = require('../models/Users');

module.exports.getAddPost = (req,res)=>{
    res.render('addpost');
}

module.exports.postAddPost = async (req,res)=>{
    const {imgUrl, title, description} = req.body;
    let date = new Date();
    let createdTime = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':';
    if(date.getMinutes()<10)
    {
        createdTime += "0" + date.getMinutes();
    }
    else{
        createdTime += date.getMinutes();
    }
    const userId = req.user._id;
    const fullname = req.user.fullname;
    const button = "likeButton";
    const imgPath = "/../imgs/insta-unlike.png";
    let newPost = new Posts({imgUrl, title, description, createdTime, fullname, button, imgPath, userId });
    newPost.save();
    await Users.findById(userId)
    .then((user)=>{
        user.posts.push(newPost._id);
        user.save();
    });
    res.render('addpost',{
        msg: 'Posted Successfully'
    });
}

module.exports.getSinglePost = async (req,res)=>{
    let postId = req.params['id'];
    let post = await Posts.findOne({_id:postId});
    res.render('singlePost',{post});
}

module.exports.postDeletePost = async (req,res)=>{
    let postId = req.params['id'];
    let userId = req.user._id;
    let post = await Posts.findOneAndRemove({_id:postId});
    let user = await Users.findOne({_id:userId});
    let index = user.posts.includes(postId);
    user.posts.splice(index,1);
    user.save();
    res.redirect('/api/all_posts');
}