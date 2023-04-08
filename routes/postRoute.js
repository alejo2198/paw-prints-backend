const router = require('express').Router();
const postController = require('../controllers/postController');
const authentication = require('../authentication/authentication');

router
    .route('/')
    .get(authentication,postController.getPosts)
    .post(authentication,postController.createPost);
   
router
    .route('/:id')
    .get(authentication,postController.getPostById)
    .put(authentication,postController.editPost)
    .delete(authentication,postController.deletePost);

module.exports = router;