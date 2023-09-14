const httpStatus = require("http-status");
const Video = require("../models/video.model");
const data = require("../utils/data");


const getVideosByQuery = async(title, genres, contentRating, sortBy) => {
    console.log("service getting",genres)
    const titleQuery = { title: {$regex: title, $options: "i"}};
    let contentRatings = getPossibleContentRating(contentRating);
    const contentRatingQuery = { contentRating: {$in: contentRatings}};

    let genreQuery = {genre: {$in: genres}};
    
    if(genres.includes("All")) {
        genreQuery = null;
    }
    // let genreQuery = "";
    // if(genres.length == 1 && genres[0] === "All") {
    //     genreQuery = {genre: {$regex: "", $options: "i"}}
    // }else {
    //     if(genres.indexOf(",") != -1) {
    //         let item = genres.split(",");
    //         genreQuery = {genre:{$in: item}};
    //     }else{
    //         genreQuery = {genre: genres}
    //     }
    // }
    console.log("service genre", genreQuery)
    const videos = await Video.find({
        ...titleQuery,
        ...genreQuery,
        ...contentRatingQuery
    })
    console.log(videos)
    if(!sortBy) {
        return videos
    }else{
        return sortVideos(videos, sortBy);
        
    }
}
const getPossibleContentRating = (contentRating) => {
    let contentRatings = [...data.contentRatings];
    if(contentRating == "All") {
        return contentRatings;
    }
    const contentRatingIndex = contentRatings.indexOf(contentRating);
    const possibleContentRating = contentRatings.splice(contentRatingIndex);
    return possibleContentRating;
}
const sortVideos = (videos, sortBy) => {
    videos.sort((video1, video2) => {
        let item1 = video1[sortBy];
        let item2 = video2[sortBy];
        if(sortBy === "releaseDate") {
            item1 = new Date(item1).getTime();
            item2 = new Date(item2).getTime();
        }
        if(item1 > item2) {
            return -1
        }else {
            return 1
        };
    })
    return videos;
}

const getVideoById = async(id)=> {
    const video = await Video.findById(id);
    if(!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Video Found With Matching Id");
    }
    return video;
}

const addVideo = async(videoData) => {
    // console.log(videoData)
    const newVideo = await Video.create(videoData);
    if(!newVideo) {
        throw new Error(httpStatus.INTERNAL_SERVER_ERROR,"Failed to create video")
    }
    const savedVideo = await newVideo.save();
    // console.log(savedVideo)
    return savedVideo;
}

const updateVotes = async(video,change,vote) => {
    if(change == "increase") {
        if(vote == "upVote") {
            video.votes.upVotes += 1;
        }else {
            video.votes.downVotes += 1;
        }
    } else {
        if(vote == "upVote"){
             video.votes.upVotes -= 1;
        }else {
            video.votes.downVotes -= 1;
        }
    }
    await video.save();
    // console.log(video);
    return;
}

const updateViewCount = async(video) => {
    video.viewCount += 1;
    await video.save();
    // console.log(video);
    return;
} 

module.exports = {
    getVideosByQuery, getVideoById, addVideo, updateVotes, updateViewCount
}