import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Cart } from "../models/cart.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"


const cartRegister = asyncHandler(async (req,res)=>{
    
    const {company,item_name,original_price,current_price,discount_percentage,return_period,delivery_date, 'rating.stars': stars, 'rating.count': count} = req.body
    console.log("company: ",company);

    if(
        [company,item_name,original_price,current_price,discount_percentage,return_period,delivery_date].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    const existedProduct = await Cart.findOne({item_name})

    if(existedProduct){
        throw new ApiError(409,"Product Already exists!!")
    }

    const imageLocalPath = req.files?.product_image[0]?.path;

    if(!imageLocalPath){
        throw new ApiError(400,"Product image is required")
    }

    const productImage = await uploadOnCloudinary(imageLocalPath)

    if(!productImage){
        throw new ApiError(400,"Product image is required")
    }

    const cart = await Cart.create({
        product_image: productImage.url,
        company,
        item_name,
        original_price,
        current_price,
        discount_percentage,
        return_period,
        delivery_date,
        rating: {
            stars: parseFloat(stars),
            count: parseInt(count, 10)
        }
    })

    const createdCart = await Cart.findById(cart._id)

    if(!createdCart){
        throw new ApiError(500,"Something went wrong while uploading cart details")
    }

    return res.status(201).json(
        new ApiResponse(200,createdCart,"Cart registered successfully!!")
    )
})

const getCart = async (req,res) => {
    try {
        const cart = await Cart.find({})

        return res.status(200).json({
            cart
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export {cartRegister,getCart}