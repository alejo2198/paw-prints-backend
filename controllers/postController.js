const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

exports.getPosts = async (req,res) =>{

  try{
    const  doggo = await getDogFromUser(req.user)
    console.log(doggo)
    if (doggo){
      knex('posts')
      .where({ doggo_id: doggo.id })
      .select('id','image','emoticon')
      .then((data) => {
        if (!data.length) {
          return res.status(404).send(`Posts with dog id: ${doggo.id} is not found`);
        }
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving inventory item ${doggo.id}`))
         
      
    }else{
      res.status(400).send('entered wrong id')
    }
   } catch (error){
      res.status(500).send(`server failed to attempt retreiving posts: ${error}`)
   }
   
   
}
exports.createPost = async (req,res) =>{
  try{
    const  doggo = await getDogFromUser(req.user)
    console.log(doggo)
    if (doggo){
      const newPost ={id:uuid(),doggo_id:doggo.id,...req.body}
      knex('posts')
        .insert(newPost)
        .then(() => {
          res.status(201).json(newPost);
        })
        .catch((error) => res.status(400).send(`Error creating Post: ${error}`));
      
    }else{
      res.status(400).send(`can't retrieve dog rfom user`)
    }
   } catch (error){
      res.status(500).send(`server failed to attempt retreiving posts: ${error}`)
   }
   
    
   
}
exports.getPostById = async (req,res) =>{
 
  const postId = req.params.id
  knex('posts')
    .where({ id: postId })
    .then((data) => {
      if(data.length !== 0){
        res.json(data[0])
      }else{
        res.status(400).send("wrong id")
      }
    })
    .catch((error) => res.status(400).send(`Error creating Post: ${error}`));
       
}
exports.editPost = (req,res) =>{
  const postId = req.params.id
  knex('posts')
    .where({ id: postId })
    .update({...req.body})
    .then(() => {
      // For DELETE response we can use 204 status code
      res.status(200).send(`pawpost with id: ${postId} has been updated`);
    })
    .catch((error) => res.status(400).send(`Error updating Post: ${error}`));
     
     
}
exports.deletePost = (req,res) =>{
  const postId = req.params.id
  knex('posts')
  .delete()
  .where({ id: postId })
  .then(() => {
    // For DELETE response we can use 204 status code
    res.status(204).send(`pawpost with id: ${postId} has been deleted`);
  })
  .catch((err) =>
    res.status(400).send(`Error deleting Warehouse ${postId} ${err}`)
  );
     
}


//Helper function
async function  getDogFromUser(userId){
  try{
    const data = await knex('doggos').where({user_id:userId})
    if(data.length !== 0){
      const doggo = data[0];
      return doggo
    } else{
      return false
    }
  } catch(error) {
    return false
  }
  
}