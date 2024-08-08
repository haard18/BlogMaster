const express = require('express');
const postRouter = express.Router(); // Use Router for routing
const fetchUser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');
const Posts = require('../Models/posts');

// Route to add a new blog post
postRouter.post('/addBlog', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }), // Corrected validation
    body('description', 'Enter a valid description').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return detailed errors
        }

        
        const newPost = new Posts({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        });

        // Save the new post to the database
        const savedBlog = await newPost.save();
        res.status(201).json(savedBlog); // Respond with created post and 201 status
    } catch (error) {
        console.error('Error creating blog:', error.message); // Log error for debugging
        return res.status(500).send({ error: "Internal server error!" });
    }
});

//Route to get all blog posts user has created : login required
postRouter.get('/getusersBlogs', fetchUser, async (req, res) => {
    try {
        const posts = await Posts.find({ user: req.user.id });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        return res.status(500).send({ error: "Internal server error!" });
    }
});

//Route to get all blog posts
postRouter.get('/getAllBlogs', async (req, res) => {
    try {
        const posts = await Posts.find().populate('user', 'username'); // Populate only the username field
        res.json(posts);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        return res.status(500).send({ error: "Internal server error!" });
    }
});


//Route to get a blog post by id
postRouter.get('/getoneBlog/:id',async(req,res)=>{
    try{
        const post = await Posts.findById(req.params.id);
        if(!post){
            return res.status(404).send({error:"Post not found"});
        }
        res.json(post);
    }
    catch(error){
        console.error('Error fetching blog:', error.message);
        return res.status(500).send({ error: "Internal server error!" });
    }
})

//Route to update a blog post by id
postRouter.put('/updateBlog/:id',[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 3 }),
    body('tag', 'Enter a valid tag').isLength({ min: 3 }),
],fetchUser,async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const newPost = {title,description,tag};
        const post = await Posts.findById(req.params.id);
        if(!post){
            return res.status(404).send({error:"Post not found"});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).send({error:"Not allowed to update this post"});
        }
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id,{$set:newPost},{new:true});
        res.json(updatedPost);

    }
    catch{
        console.error('Error updating blog:', error.message);
        return res.status(500).send({ error: "Internal server error!" });
    }
});


//Route to delete a blog post by id 
postRouter.delete('/deleteBlog/:id',fetchUser,async(req,res)=>{
    try{
        const post = await Posts.findById(req.params.id);
        if(!post){
            return res.status(404).send({error:"Post not found"});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).send({error:"Not allowed to delete this post"});
        }
        await Posts.findByIdAndDelete(req.params.id);
        res.json({msg:"Post deleted successfully"});

    }
    catch(error){
        console.error('Error deleting blog:', error.message);
        return res.status(500).send({ error: "Internal server error!" });

    }
})

// route for liking the post

  postRouter.put('/like/:id', fetchUser, async (req, res) => {
 try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    if (post.likes.includes(req.user.id)) {
      return res.status(401).send({ error: "Already liked the post" });
    }
    post.likes.push(req.user.id);
    await post.save();
    res.json(post.likes.length);
    
 } catch (error) {
   console.error('Error liking blog:', error.message);
   return res.status(500).send({ error: "Internal server error!" });
    
 }
  });

  // route for unliking the post
  postRouter.delete('/unlike/:id', fetchUser, async (req, res) => {
    try {
       const post = await Posts.findById(req.params.id);
       if (!post) {
         return res.status(404).send({ error: "Post not found" });
       }
       if (!post.likes.includes(req.user.id)) {
         return res.status(401).send({ error: "Post not liked yet" });
       }
       const index = post.likes.indexOf(req.user.id);
       post.likes.splice(index, 1);
       await post.save();
       res.json(post.likes.length);
       
    } catch (error) {
      console.error('Error unliking blog:', error.message);
      return res.status(500).send({ error: "Internal server error!" });
       
    }
     });
    

module.exports = postRouter;
