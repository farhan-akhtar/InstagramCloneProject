const Posts = require('../models/Posts');
const Users = require('../models/Users');

module.exports.getHome = async (req,res)=>{
    const userId = req.user._id;
    await Posts.find({})
    .then((posts)=>{
        for(let p of posts){
            if(p.liked.includes(userId)){
                p.button = "unlikeButton";
                p.imgPath = "/../imgs/insta-like.png";
            }
            else{
                p.button = "likeButton";
                p.imgPath = "/../imgs/insta-unlike.png";
            }
            p.save();
        }
    });

    await Posts.find({})
    .then((data)=>{
        res.render('home',{
            data
        });
    })
    .catch((err)=>{
        res.send(err);
    });
    
}
