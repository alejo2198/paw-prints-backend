const router = require('express').Router();
const doggoController = require('../controllers/doggoController');


router
    .route('/')
    .post(doggoController.createDoggo);

router
    .route('/:doggo-id')
    .get(doggoController.getDoggoById)
   
module.exports = router;