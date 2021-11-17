require('dotenv').config()
const express = require('express')
const postService = require('../services/postService')
const { request, response } = require('express')
const catchAsync = require('../functions/catchAsync')

const createPost = catchAsync(async (request,response)=> {
    console.log(request)
    const post = await postService.createPost(request,response)

    return response.status(200).send(post)

})
const getPosts = catchAsync(async (request,response)=> {
    const posts = await postService.getPosts(request,response)
    return response.status(200).send(posts)
})

module.exports = {
    createPost,
    getPosts
}