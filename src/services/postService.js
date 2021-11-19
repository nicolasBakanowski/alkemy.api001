const { response, request } = require('express')
const { Image } = require('image-js');

const Post = require('../models/postModel')
const Category = require ('../models/categoryModel')
require('dotenv') 



async function createPost(request,response){     
    const existCategory = await Category.count({
        where: {
            id: request.body.categories_id
        }
    })

    if (existCategory < 1) return response.status(400).send({status: "this category don't exists"})
    

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
    Post.belongsTo(Category, {foreignKey: 'categories_id'})
    const post = await Post.findAll({
        include:[{
            model: Category,
        }],
        order:[
            ['createdAt', 'DESC'],
        ]
    });
    if (post.length <1) return response.status(404).send({status:'No hay post que mostrar'})
    return post
}


async function editPost(request,response){     
    const existPost =  await Post.count({
        where: {
            id: request.body.id
        }
    })
    if (existPost < 1) return response.status(400).send({status:'this post not'})
    const newPost = Post.create(
        request.body
    )
    return newPost
}

module.exports = {
    createPost,
    getPosts
}