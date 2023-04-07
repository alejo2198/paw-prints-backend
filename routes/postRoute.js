const router = require('express').Router();
const postController = require('../controllers/postController');


router
    .route('/:doggo-id')
    .get(postController.getPosts)
    .post(postController.createPost);
   
router
    .route('/:post-id')
    .get(postController.getPostById)
    .put(postController.editPost)
    .delete(postController.deletePost);

module.exports = router;