const express = require("express");
const VideoController = require("../../controllers/video.controller");
const validate = require("../../middlewares/validate");
const videoValidation = require("../../validations/video.validation");

const router = express.Router();

router.get("/",validate(videoValidation.videoByQuery),VideoController.getVideos);
router.post("/",validate(videoValidation.addVideo),VideoController.addVideo);
router.get("/:videoId",VideoController.getVideoById);
router.patch("/:videoId/votes",validate(videoValidation.updateVotes),VideoController.updateVotes);
router.patch("/:videoId/views",validate(videoValidation.updateViews),VideoController.updateViewCount);

module.exports = router;