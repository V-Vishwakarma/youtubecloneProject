import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  // remove whitespace
            index: true,   // for faster search
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  // remove whitespace
            index: true,   // for faster search
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,   // for faster search
        },
        avatar: {
            type: String,  // Cloudinary URL for image storage
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Video',
                }
            ]
        },
        password: {
            type: String,
            minLength: 6,
            required: [true, 'Password is required'],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);


// save it the middleware which is used to save the data in the database
// pre is the hook which is used to perform some action before saving the data in the database
// if any data any modified this will save the password again and again to prevent this we are using the isModified method
// ifModified is used to chechk is the particular filed saved or not
// we can not use () = > {} arrow function because it will not have access to 'this' keyword thats why we are using normal function
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // if password is not modified, skip hashing
    this.password = bcrypt.hash(this.password, 10); // hash the password with bcrypt
    next(); // call the next middleware
})


// we can also generate the methods 
// this will check password is correct or not beaucse user give passwword on login are in simple string format and we have hashed password in the database so we need to compare the password with the hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // compare the password with the hashed password and campare will return true or false
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFERESH_TOKEN_EXPIRES
        }
    )
}


export const User = mongoose.model('User', userSchema)