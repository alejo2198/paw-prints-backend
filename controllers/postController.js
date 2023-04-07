const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

exports.getPosts = (req,res) =>{
    knex('posts')
    .where({ doggo_id: req.params.doggo-id })
    .then((data) => {
      if (!data.length) {
        return res.status(404).send(`Posts with dog id: ${req.params.doggo-id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventory item ${req.params.doggo-id}`))
       
}
exports.createPost = (req,res) =>{
    
    const newPost ={id:uuid(),doggo_id:req.params.doggo-id,...req.body}
    
    knex('posts')
      .insert(newPost)
      .then(() => {
        res.status(201).json(newPost);
      })
      .catch((error) => res.status(400).send(`Error creating Post: ${error}`));
}
exports.getPostById = (req,res) =>{
    
     
}
exports.editPost = (req,res) =>{
    
     
}
exports.deletePost = (req,res) =>{
    
     
}
