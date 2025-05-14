import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/ApiErrors.js";
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinery.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {

    // below code is just to check that our route is working fine
    // res.status(200).json({
    //     success: true,
    //     message: 'User registered successfully',
    //     // data: req.body // Echo back the received data
    // });


    // below code is to register the user
    // what should we do to register the user

    // 1) get the user details from the frontend according to the model you create
    // 2) validation - not empty the fields and more according to the model validation is on frontend and backend both
    // 3) check is the user already exist in the database
    // 4) check for the image and avatar
    // 5) upload the image and avatar to the cloudinary
    // 6) create a user object - to create entry in the database
    // 7) in response remove the password and refresf token
    // 8) check for the user is created or not
    // 9) retuen the response to the frontend

    const { fullName, email, username, password } = req.body;
    console.log("User Details: ", email);


    // validations
    // if (fullName === "" || email === "" || password === "") {
    //     throw new ApiError(400, "Please fill all the fields");
    // }
    // or 

    // chechk if the fields are empty
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fileds are required')
    }

    // check if the user already exists  and The User is coming from the model we made
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User name or email already exists")
    }

    // check for the image and avatar

    // this req.files comes from the multer middleware
    // req.files is an object that contains the files uploaded and we already set it in the multer.middleware.js file
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLoacalPath = req.files?.coverImage[0]?.path;
    console.log("Avatar Local Path: ", avatarLocalPath);
    // this is the validation for the image avatar
    if (!avatarLocalPath) {
        throw new ApiError(400, 'Please upload the avatar image')
    }

    // this is for uploading the image to the cloudinary uploadOnCloudinary is importing from the cloudinary.js file
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLoacalPath);

    if (!avatar) {
        throw new ApiError(400, 'Please upload the avatar image')
    }


    // creating a user obejct for the entry in the database

    const user = await User.create({
        fullName,
        avatar: avatar?.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    // this is to check the user is created or not and its full prove way to check is the user is created or not
    // we can also allow which data is to be returned in the response
    const checkUserCreated = await User.findById(user._id).select("-password -refreshToken")

    if (!checkUserCreated) {
        throw new ApiError(500, 'Something went wrong while registering the user')
    }

    // returin the response to the frontend with the ApiResponse class
    return res.status(201).json(
        new ApiResponse(200, checkUserCreated, "User registered successfully")
    )


})

export { registerUser };
// export const registerUserController = asyncHandler(registerUser);
