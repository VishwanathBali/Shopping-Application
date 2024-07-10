import { Router } from "express";
import { cartRegister,getCart } from "../controllers/cart.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "product_image",
            maxCount: 1
        }
    ]),
    cartRegister)

router.route("/").get(getCart)

export default router;