const mongoose = require("mongoose");
const data = require("../utils/data");
const genres = data.genre;
const contentRatings = data.contentRatings;

  

const videoSchema = new mongoose.Schema({
    videoLink: {
        type: String
    },
    title: {
        type: String, required:true,trim:true
    },
    genre: {
        type: String, required: true,trim:true,validate(value) {if(!genres.includes(value)){throw new Error("Invalid Genre")}}
    },
    contentRating: {
        type: String,required: true,trim:true,validate(value) {if(!contentRatings.includes(value)){throw new Error("Invalid Content Rating")}}
    },
    releaseDate: {
        type: String, required: true
    },
    previewImage: {
        type: String,
        // required:true
    },
    votes: {
        upVotes: {
          type: Number,
          default: 0,
        //   required : true
        },
        downVotes: {
          type: Number,
          default: 0,
        //   required : true
        },
      },
    viewCount: {type: Number, default:0,
        // required:true
    }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;