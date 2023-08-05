const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    comment: String,
    fullname: String,
    userId: { type: Schema.Types.ObjectId, ref: "Users" }
});
module.exports = mongoose.model("Comments", commentSchema);