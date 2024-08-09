import {Router} from "express"
import { signup,login,logout } from "../controllers/user.controller.js"
import authenticate from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/protected").get(authenticate,(req,res) => {
    res.status(200).json({ message: "This is a protected route", user: req.user})
})
router.route("/logout").get(logout)

export default router