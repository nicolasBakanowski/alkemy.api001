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


async function getPost(request,response){
    Post.belongsTo(Category, {foreignKey: 'categories_id'})
    const post = await Post.findAll({
        include:[{
            model: Category,
        }],
        where:{
            id: request.params.id
        }
    });
    if (post.length <1) return response.status(404).send({status:'No hay post que mostrar'})
    return post
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
    const existCategory = await Category.count({
        where:{
            id:request.params.id
        }
    })
    
    if (existCategory == 0) return response.status(400).send({status:"this category does exists"})

    const post = await Post.findOne({
        where:{
            id: request.params.id
        }
        })                   
        Object.assign(post, request.body)
        await post.save()  
    return post
}


async function deletePost(request,response){
    const post = await Post.findOne({
        where:{
            id: request.params.id
        }
    })                   
    if (!post) return response.status(404).send({status:'there is no post with that id'})
    await Post.destroy({
        where: {
            id: request.params.id 
        }
    }) 
    return response.status(200).send({status:'the post has been deleted'})
}


module.exports = {
    createPost,
    getPosts,
    getPost,
    editPost,
    deletePost
}