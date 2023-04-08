const router = require('express').Router();
const userController = require('../controllers/userController');

  
router
    .route('/signup')
    .post(userController.signup);

router
    .route('/login')
    .post(userController.login)
    
router
    .route('/:id')
    .get(userController.userInfo);
   
module.exports = router;