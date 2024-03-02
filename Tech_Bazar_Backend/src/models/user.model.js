import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "json-web-token";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            trim: true,
            index: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
            trim: true
        },
        profileImage: {
            type: String // the uploading of the image will be on third party services like cloudnairy
        },
        dob: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }

    },{
        timestamps: true
    }
)

userSchema.pre("save", async function (next){
    if(this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

export const user = mongoose.model("User", userSchema);