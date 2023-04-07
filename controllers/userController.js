const knex = require('knex')(require('../knexfile'));
const { v4: uuid } = require('uuid');

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

exports.signup = (req,res) => {
    const newUser ={id:uuid(),...req.body}
    
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
       
        if(user.password !== password){
          res.status(404).send(`Wrong password,try again`);
        }else{
          res.send('success')
        }
      
      });
    

}