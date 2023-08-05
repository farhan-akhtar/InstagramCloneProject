const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: String,
    username: String,
    password: String,
    followButton: String,
    following: [ObjectId], 
    followers: [ObjectId], 
    posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }]
});

module.exports = mongoose.model("Users", userSchema);