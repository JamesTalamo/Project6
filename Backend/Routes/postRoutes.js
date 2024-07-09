const express = require('express');
const router = express.Router()

const postControls = require('../Controller/PostController')

router.patch('/:postId/:name', postControls.likePost)

// Routes for the POST in home! ito yung route pag mag aadd ka ng new post sa newsfeed area
router.post('/addPost', postControls.createNewPost)
router.put('/:name', postControls.getOnePost)
router.get('/allPost', postControls.getAllPost)



module.exports = router