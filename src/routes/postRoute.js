require('dotenv').config()
const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const postValidation = require('../validations/postValidation')
const validate = require('../middleware/validate')

router.route('/')
    .post(validate(postValidation.createPost) ,postController.createPost)
    .get(postController.getPosts)

module.exports = router