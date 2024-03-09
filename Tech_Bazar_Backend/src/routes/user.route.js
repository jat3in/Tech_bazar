import {Router} from "express"
import { loginUser, logoutHandler, registerUser } from "../controllers/user.controller.js";
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

export default router;