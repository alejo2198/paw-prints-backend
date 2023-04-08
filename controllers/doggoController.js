const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');


exports.createDoggo = (req,res) =>{
    const newDoggo ={
        id:uuid(),
        user_id:req.user,
        ...req.body
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
exports.getDoggoById = (req,res) =>{
    knex('doggos')
    .where({user_id:req.user})
    .then(data=>{
      if(data.length !== 0){
        const doggo = data[0];
        res.json(doggo)
      } else{
        res.status(400).send('entered wrong id')
      }
    })
    .catch(error=>{
      res.status(400).send('error retreiving doggo by id')
    })
     
}

exports.getMetrics = (req,res) =>{
    knex('doggos')
    .where({user_id:req.user})
    .then(data=>{
      if(data.length !== 0){
        const doggo_id = data[0].id;
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
        
      } else{
        res.status(400).send('entered wrong id')
      }
    })
    .catch(error=>{
      res.status(400).send('error retrieving doggo by id')
    })
     
}
exports.incrementMetric = (req,res) =>{
    
     
}
