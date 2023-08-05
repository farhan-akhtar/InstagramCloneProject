const Posts = require('../models/Posts');

module.exports.postLike = async (req,res)=>{
    const postId = req.params['id'];
    const userId = req.user._id;
    await Posts.findById(postId)
    .then((post)=>{
        post.liked.push(userId);
        post.button = "unlikeButton";
        post.imgPath = "/../imgs/insta-like.png";
        post.save();
        res.send(post);
    })
    .catch((err)=>{
        res.send(err);
    });
}

module.exports.postUnlike = async (req,res)=>{
    const postId = req.params['id'];
    const userId = req.user._id;
    await Posts.findById(postId)
    .then((post)=>{
        const index = post.liked.indexOf(userId);
        post.liked.splice(index,1);
        post.button = "likeButton";
        post.imgPath = "/../imgs/insta-unlike.png";
        post.save();
        res.send(post);
    }).catch((err)=>{
        res.send(err);
    });
}