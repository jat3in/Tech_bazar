import {Router} from "express"
import { loginUser, logoutHandler, registerUser,generateAccessRefreshToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateProfileImage, getUserChannelSubscriber, watchHistory } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([{
    name: "profileImage",
    maxCount: 1
}
    ]),
    
    registerUser)

router.route("/login").post(loginUser)

// secured roiutes

router.route("/logout").post(verifyJWT,logoutHandler)
router.route("/refresh-token").post(generateAccessRefreshToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account-details").patch(verifyJWT,updateAccountDetails)
router.route("/avatar").patch(verifyJWT,upload.single("profileImage"),updateProfileImage)

router.route("/c/:username").get(verifyJWT,getUserChannelSubscriber)
router.route("/history").get(verifyJWT,watchHistory)

export default router;