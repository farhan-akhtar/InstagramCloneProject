const Posts = require('../models/Posts');
const Comments = require('../models/Comments');
const Users = require('../models/Users');

module.exports.getComments = async (req,res)=>{
    try{
        const postId = req.params['id'];
        const postdata= await Posts.findOne({_id:postId}).populate("comments");
        res.render("comment",{
            post:postdata,
            comments:postdata.comments
        });
    }catch(err){
        res.send(err);
    }
}

module.exports.postComment = async (req,res)=>{
    const {postId, comment} = req.body;
    const userId = req.user._id;
    try{
        let post = await Posts.findOne({_id:postId});
        let user = await Users.findOne({_id:userId});
        let fullname = user.fullname;
        let newComment = await Comments.create({comment, fullname, userId});
        post.comments.push(newComment._id);
        post.save();
        res.redirect(`/api/comment/${post._id}`);
    }catch(err){
        res.send(err);
    }
}