const { response, request } = require('express')
const Post = require('../models/postModel')
require('dotenv') 



async function createPost(request,response){
    console.log(request.body)
    const existPost =  await Post.count({
        where: {
            title: request.body.title
        }
    })
    if (existPost > 1) return response.status(400).send({status:'this post already exists '})
    const newPost = Post.create(
        request.body
    )
    return newPost
}

async function getPosts(request,response){
    //const post = await Post.findAll({
    //    order:[
    //        ['creation_date', 'DESC'],
    //    ]
    //});
    if (post.length <1) return response.status(404).send({status:'No hay post que mostrar'})
    return post
}

module.exports = {
    createPost,
    getPosts
}