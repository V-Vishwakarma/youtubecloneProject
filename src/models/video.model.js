import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,  // Cloudinary URL for video storage
            required: true,
        },
        thumbnail: {
            type: String,  // Cloudinary URL for image storage
            required: true,
        },
        title: {
            type: String,
            required: true,
            index: true,   // for faster search means it will create an index on this field and optimize the search performance
        },
        describtion: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // it basically comes from cloudinary also because they have machenism to get the duration of the video same as aws and more have
            required: true,
        },
        views: {
            type: Number,
            default: 0,     // default value for views is 0
        },
        isPublished: {
            type: Boolean,
            default: false,  // default value for isPublished is false
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",  // reference to the User model
        }
    },
    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema)