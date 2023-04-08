const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

exports.signup = (req,res) => {
   // const password = bcrypt.hashSync(req.body.password,10)
   const salt = bcrypt.genSaltSync();
   const password = bcrypt.hashSync(req.body.password,salt);
    const newUser ={
      id:uuid(),
      username:req.body.username,
      password:password
      }
    
    knex('users')
      .insert(newUser)
      .then(() => {
        res.status(201).json(newUser);
      })
      .catch((error) => res.status(400).send(`Error creating User: ${error}`));
}

exports.login = (req,res) => {
    //verify login
    const username = req.body.username;
    const password = req.body.password;

    knex('users')
       .where({username: username})
       .then((data)=>{
        
        if (!data.length) {
          res.status(404).send(`User not found`);
        }
        const user = data[0];

        const isMatch = bcrypt.compareSync(password,user.password)
        if(!isMatch){
          res.status(404).send(`Wrong password,try again`);
        }else{
          const accessToken = jwt.sign(user.id,process.env.ACCESS_TOKEN_SECRET)
          res.json({accessToken:accessToken})
        }
      
      });
    

}

exports.userInfo = (req,res) =>{
  knex('users')
  .where({ id: req.params.id })
  .then((data) => {
    if (!data.length) {
      return res.status(404).send(`User with id: ${req.params.id} is not found`);
    }
    res.status(200).json(data[0]);
  })
  .catch((err) =>
    res.status(400).send(`Error retrieving user with id: ${req.params.id}`))
     
}