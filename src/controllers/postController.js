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
const getPost = catchAsync(async (request,response)=> {
    const post = await postService.getPost(request,response)
    return response.status(200).send(post)
})
const editPost = catchAsync(async (request,response)=> {
    const post = await postService.editPost(request,response)
    return response.status(200).send(post)
})

const deletePost = catchAsync(async (request,response)=> {
    await postService.deletePost(request,response)
    return response.status(200).send({message:"the post has been deleted"})
})

module.exports = {
    createPost,
    getPosts,
    editPost,
    getPost,
    deletePost
}