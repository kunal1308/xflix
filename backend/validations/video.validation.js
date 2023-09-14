// const Joi = require("joi");
const {objectId} = require("./custom.validation");
const data = require("../utils/data");

const Joi = require("joi").extend((joi) =>
({
   base: joi.array(),
   coerce: (value, helpers) => ({
    value: value.split ? value.split(",") : value,
  }),
  type : "stringArray",
}))


const videoByQuery = {
    query:Joi.object().keys({
        title: Joi.string(),
        // genres: Joi.string(),
        genres: Joi.stringArray(),
        // .valid(...data.genres, "All"),
        contentRating: Joi.string(),
        // .valid(...data.contentRatings, "All"),
        sortBy: Joi.string().valid(...data.sortBy, "releaseDate")
     })
}

const addVideo = {
    body:Joi.object().keys({
    videoLink: Joi.string().regex(/^https?:\/\/(?:www\.)?youtube\.com\/embed\/?([a-zA-Z0-9_-]+)$/),
    title: Joi.string().required(),
    genre: Joi.string().required().valid(...data.genre),
    contentRating: Joi.string().required().valid(...data.contentRatings),
    releaseDate: Joi.string().required(),
    previewImage:  Joi.string().uri()
})
};
const updateVotes = {
    params: Joi.object().keys({
        videoId: Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({
        vote: Joi.string().required().valid(...data.voteTypes),
        change: Joi.string().required().valid(...data.voteChanges)
    })
}

const updateViews = {
    params: Joi.object().keys({
        videoId: Joi.required().custom(objectId)
    })
};

module.exports = {
    videoByQuery, addVideo, updateViews, updateVotes
}