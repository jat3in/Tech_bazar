import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "tweet"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})


export const LikeSchema = mongoose.model("Like",likeSchema)