const router = require('express').Router();
const doggoController = require('../controllers/doggoController');
const authentication = require('../authentication/authentication');


router
    .route('/')
    .get(authentication,doggoController.getDoggoById)
    .post(authentication,doggoController.createDoggo);
   

router
    .route('/metrics')
    .get(authentication,doggoController.getMetrics)
    .put(authentication,doggoController.incrementMetric)
   
   
module.exports = router;