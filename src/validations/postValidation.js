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
const getPost={
    params: Joi.object(),
        id: Joi.number().min(1).required()
}

const editPost = {
    params: Joi.object().keys({
      id: Joi.number().min(1).required()
    }),
    body: Joi.object()
      .keys({
        title: Joi.string(),
        content: Joi.string(),
        image: Joi.custom(isImage),
        categories_id: Joi.number().min(1)
      })
      .min(1),
};

const deletePost={
    params: Joi.object(),
        id: Joi.number().min(1).required()
}  

module.exports = {
    createPost,
    editPost,
    getPost,
    deletePost
}