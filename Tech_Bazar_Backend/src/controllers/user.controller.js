import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudnairy} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { response } from "express";

const generateAccessAndRefereshTokens = async (user_id) => {
    const user = await User.findById(user_id);
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})

    return {accessToken,refreshToken}
}

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

   const {fullname, email, username,password}=req.body

//    console.log("email: ",email)

   if(
[fullname,email,username,password].some((field)=> field?.trim() === "")
   ){
       throw new ApiError(400 ,"All fields are required")
   }
const existedUser = await User.findOne({
    $or: [{ username },{ email }]
})

if(existedUser){
    throw new ApiError(409, "User With email or username already exists")
}

// const profileImageLocalPath = req.files?.profileImage[0]?.path; 

// if(!profileImageLocalPath){
//     throw new ApiError(400, "Profile Image file is required")
// }

// const profileImage = await uploadOnCloudnairy(profileImageLocalPath);
//   console.log(profileImage)
// if(!profileImage){
//     throw new ApiError(400, "Profile file is required")
// }

const user = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password
    
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

const loginUser = asyncHandler( async (req,res) => {


    const {email,username,password} = req.body

    console.log(username, password)

    if(!email && !username){
        throw new ApiError(400,"Username or email is required")
    }

    const user = await User.findOne({
        $or: [{email},{username}]
    })

    if(!user){
        throw new ApiError(400, "User is not found please register")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid credentials")
    }


  const {accessToken,refreshToken} =  await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
    new ApiResponse(200,{
        user: loggedInUser, accessToken,refreshToken
    },
    "user logged in successfully")
  )

})

const logoutHandler = asyncHandler( async(req,res) => {
  await  User.findByIdAndUpdate(req.user._id,
        {
            $set: {refreshToken: undefined} 
        },
        {
            new: true
        })

        const options = {
            httpOnly: true,
            secure: true
        }
      
        return res.status(200).clearcokkie("accessToken",options).clearcokkie("refreshToken",options).json(new ApiResponse(200, {}, "user logged out successfully"))
})

export {registerUser, loginUser, logoutHandler} 