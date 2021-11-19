const Joi = require('joi')
const {isImage} = require('../validations/customValidation')

const createPost = {
    body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.custom(isImage).required(),
        categories_id: Joi.number().min(1).required()

    }) 
}
const editPost = {
    body: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        image: Joi.custom(isImage),
        categories_id: Joi.number().min(1)

    }) 
}
module.exports = {
    createPost,
    editPost
}