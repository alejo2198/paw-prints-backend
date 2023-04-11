const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');
const path = require('path')


exports.createDoggo = (req,res) =>{
 
  let imagePath = '';
  
  if (req.files){
      const {profile_picture} = req.files;
      const uploadPath = path.resolve(__dirname,`../public/images/${req.files.profile_picture.name}`)
      profile_picture.mv(uploadPath,(error)=>{
          if (error){
              return res.status(500).send(error);
          }
      })
      imagePath = req.files.profile_picture.name;
  }
  
  console.log(req.user)
    const newDoggo ={
        id:uuid(),
        user_id:req.user,
        ...req.body,
        age:+(req.body.age),
        profile_picture: `http://localhost:8080/images/${imagePath}`
        }
    const defaultMetrics = {
        id:uuid(),
        doggo_id:newDoggo.id,
        main:0,
        walk:0,
        belly_rub:0,
        treat:0,
        stretch:0,
        dog_park:0,
        trick:0,
    }
    console.log(newDoggo)
      
    knex('doggos')
        .insert(newDoggo)
        .then(() => {

          knex('metrics')
          .insert(defaultMetrics)
          .catch((error) => res.status(400).send(`Error creating Doggo: ${error}`));
          res.status(201).json(newDoggo);

        })
        .catch((error) => res.status(400).send(`Error creating Doggo: ${error}`));
    
    
}
exports.getDoggoById = async (req,res) =>{
   try{
    const  doggo = await getDogFromUser(req.user)
    if (doggo){
      res.status(200).json(doggo)
    }else{
      res.status(400).send('entered wrong id')
    }
   } catch (error){
      res.status(500).send(`server failed to attempt retreiving doggo ${error}`)
   }
    
 }
    


exports.getMetrics = async (req,res) =>{
  try{
    const  doggo = await getDogFromUser(req.user)
    if (doggo){
      const doggo_id = doggo.id;
        knex('metrics')
        .where({doggo_id:doggo_id})
        .then(data=>{
          if(data.length !== 0){
            const metrics = data[0];
            res.status(200).json(metrics)
          }
        })
        .catch(error =>{
          res.status(400).send('error retrieving metrics')
        })
    }else{
      res.status(400).send('entered wrong id')
    }
   } catch (error){
      res.status(500).send(`server failed to attempt retreiving doggo ${error}`)
   }
   
}
exports.incrementMetric = async  (req,res) =>{
  try{
    const  doggo = await getDogFromUser(req.user)
    if (doggo){
      const metric=req.body.metric
      const doggo_id = doggo.id;
      knex('metrics')
        .where({doggo_id:doggo_id})
        .increment(metric,1)
        .then(()=>{
          res.status(200).send(`${metric} was updated successfully`)
        })
        .catch(error =>{
          res.status(400).send('metric does not exist')
        })
    }else{
      res.status(400).send('entered wrong id')
    }
   } catch (error){
      res.status(500).send(`server failed to attempt retrieving doggo ${error}`)
   }

 
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