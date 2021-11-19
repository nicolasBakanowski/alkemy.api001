require('dotenv').config()
const postService = require('../services/postService')
const catchAsync = require('../functions/catchAsync')

const createPost = catchAsync(async (request,response)=> {
    const post = await postService.createPost(request,response)
    return response.status(200).send(post)

})
const getPosts = catchAsync(async (request,response)=> {
    const posts = await postService.getPosts(request,response)
    return response.status(200).send(posts)
})
const editPost = catchAsync(async (request,response)=> {
    const post = await postService.editPost(request,response)
    return response.status(200).send(post)
})
module.exports = {
    createPost,
    getPosts,
    editPost
}