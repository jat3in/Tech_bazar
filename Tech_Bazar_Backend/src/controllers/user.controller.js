import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudnairy} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
   // get user detail form frontend
   // validation - not empty
   // check if user is already exists: username , email
   // check for images, check for avatar
   // upload them to cloudnairy, avatar 
   // create user object - create entry in db
   // remove password and referesh token field
   // check for user creation 
   // return res

   const {fullName, email, username,password}=req.body

   console.log("email: ",email)

   if(
[fullName,email,username,password].some((field)=> field?.trim() === "")
   ){
       throw new ApiError(400 ,"All fields are required")
   }
const existedUser = User.findOne({
    $or: [{ username },{ email }]
})

if(existedUser){
    throw new ApiError(409, "User With email or username already exists")
}

const profileImageLocalPath = req.files?.profileImage[0]?.path; 

if(!profileImageLocalPath){
    throw new ApiError(400, "Profile Image file is required")
}

const profileImage = await uploadOnCloudnairy(profileImageLocalPath);

if(!profileImage){
    throw new ApiError(400, "Profile file is required")
}

const user = await User.create({
    fullname,
    profileImage: profileImage.url,
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
)

})

export {registerUser}