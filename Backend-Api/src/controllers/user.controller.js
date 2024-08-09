import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const signup = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body
    console.log(("email: ",email));

    if(
        [username,email,password].some((item)=>item?.trim() === "")
    ){
        throw new ApiError(401,"All fields are required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(409,"Already user exits with this email id")
    }

    const user = await User.create({username,email,password})

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})

export const login = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    if(
        [email,password].some((field)=>field.trim()==="")
    ){
        throw new ApiError(401,"All fields are required")
    }

    const existedUser = await User.findOne({email})

    if(!existedUser){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await existedUser.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }

    const jwtToken = await existedUser.generateAccessToken();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }

    return res
    .status(200)
    .cookie("accessToken",jwtToken,options)
    .json(
        new ApiResponse(
            200,
            {
                email,jwtToken
            },
            "User logged In successfully"
        )
    )
})

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User logged out successfully"
        )
    );
});

