const { response, request } = require('express')

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
    const existPost  = await Post.count({
        where: {
            id: request.params.id
        }
    })
    if (existPost <1) return response.status(404).send({status: "no hay post que mostrar"})
    const existTitle  = await Post.count({
        where: {
            title:request.body.title
        }
    })
    if (existTitle > 0) return response.status(400).send({status:"this title already exists"})
    if (request.body.title != undefined){
        await Post.update({
            title : request.body.title
        },
        {   
            where:{
            id: request.params.id
        }
            })
        }
    if (request.body.content != undefined){
        await Post.update({
            content : request.body.content
        },
        {   
            where:{
            id: request.params.id
        }
            })
        }
    if (request.body.image != undefined){
        await Post.update({
            image : request.body.image
        },
        {   
            where:{
            id: request.params.id
        }
            })
        }
    if (request.body.categories_id != undefined){
        const existCategory = await Category.count({
            where: {
                id: request.body.categories_id
            }
        })
        if (existCategory < 1) return response.status(400).send({status: "this category don't exists"})
        await Post.update({
            categories_id : request.body.categories_id
        },
        {   
            where:{
            id: request.params.id
        }
            })
        }     
    const post = await Post.findOne({
        where:{
            id: request.params.id
        }
    })                   
    return post
}

module.exports = {
    createPost,
    getPosts,
    editPost
}