const httpStatus = require("http-status");
const VideoService = require("../services/video.service");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const getVideos = catchAsync(async (req, res) => {
  console.log("Controller", req.query.genres);
  // const title = req.query.title ?  req.query.title : "";
  // const contentRating =  req.query.contentRating ?  req.query.contentRating : "All";
  // const genres =  req.query.genres ?  req.query.genres : ["All"];
  // const sortBy =  req.query.sortBy ?  req.query.sortBy : "releaseDate";

  const { title, contentRating, genres, sortBy } = req.query;
  const title1 = title ? title : "";
  const contentRating1 = contentRating ? contentRating : "All";

  const genres1 = genres ? genres : ["All"];
  
  const sortBy1 = sortBy ? sortBy : "releaseDate";
  console.log("here", title1, genres1, contentRating1);
    console.log("controller",genres1)
  const videos = await VideoService.getVideosByQuery(
    title1,
    genres1,
    contentRating1,
    sortBy1
  );

  res.status(httpStatus.OK).send({ videos: videos });
});

const getVideoById = catchAsync(async (req, res) => {
  const videos = await VideoService.getVideoById(req.params.videoId);
  res.status(httpStatus.OK).send(videos);
});

const addVideo = catchAsync(async (req, res) => {
  const newVideo = await VideoService.addVideo(req.body);
  res.status(httpStatus.CREATED).send(newVideo);
});

const updateViewCount = catchAsync(async (req, res) => {
  const videoId = req.params.videoId;
  console.log(videoId);
  const video = await VideoService.getVideoById(videoId);
  await VideoService.updateViewCount(video);
  return res.status(httpStatus.NO_CONTENT).send();
});

const updateVotes = catchAsync(async (req, res) => {
  const videoId = req.params.videoId;
  const { change, vote } = req.body;
  const video = await VideoService.getVideoById(videoId);
  await VideoService.updateVotes(video, change, vote);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getVideos,
  getVideoById,
  updateViewCount,
  updateVotes,
  addVideo,
};
