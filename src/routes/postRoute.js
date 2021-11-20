require('dotenv').config()
const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const postValidation = require('../validations/postValidation')
const validate = require('../middleware/validate')

router.route('/')
    .post(validate(postValidation.createPost), postController.createPost)
    .get(postController.getPosts)

router.route('/:id')
    .get(validate(postValidation.getPost),postController.getPost)
    .patch(validate(postValidation.editPost), postController.editPost)
    .delete(validate(postValidation.deletePost),postController.deletePost)
    
module.exports = router