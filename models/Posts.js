const mongoose = require("mongoose");
const { Schema } = mongoose;
var postSchema = new Schema({
    imgUrl: String,
    title: String,
    description: String,
    createdTime: String,
    fullname: String, 
    button: String,
    imgPath: String,
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    liked: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }]
});
module.exports = mongoose.model("Posts", postSchema);