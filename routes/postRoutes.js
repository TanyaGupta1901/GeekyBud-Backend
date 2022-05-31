const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/User')
const isAuthenticated = require('../middleware')
router.get("/allPosts", (req, res) => {

    Post.find({}).sort({createdAt : -1}).exec((err, posts) => {

        if (err)
            return res.status(400).json({ "message": "some error occured" })
        else
            return res.status(200).json({ posts })
    })
});

router.get("/userPosts/:userId", (req, res) => {

    Post.find({ user: req.params.userId }).sort({createdAt : -1}).exec((err, posts) => {
        if (err)
            return res.status(400).json({ message: err });
        else {
            return res.status(200).json({ posts });
        }
    })

})

router.get("/viewPost/:id", (req, res) => {

})

router.get("/createPost", isAuthenticated, (req, res) => {
    console.log("request recieved");
})

router.get("/updatePost/:postId", isAuthenticated, (req, res) => {

})

router.get("/deletePost/:postId", (req, res) => {

})

router.post("/createPost/:userId", isAuthenticated, (req, res) => {

    if(req.body.title=="" && req.body.description=="" && req.body.skills.length == 0)
    return res.status(422).json({ message : "post cannot be empty" })

    User.findById(req.params.userId, (err, user) => {

        if (err)
            return res.status(404).json({ message: "error occured" })
        console.log(user.email);

        
        const data = {
            tags: req.body.skills,
            title: req.body.title,
            description: req.body.description,
            user: req.params.userId,
            userName: user.name,
            userMail : user.email,
            avatar: user.img,
            
        }
        // User.findById(req.params.userId, (err, user) => {
        //   if(user)
        //   {
        Post.create(data, (err, post) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ message: "err" })
            }
            else {
                console.log(post);
                User.findById(req.params.userId, (err, user) => {
                    if (err)
                        return res.status(400).json({ error: err })
                    else {
                        user.posts.push(post._id);
                        user.save()
                    }
                })
                // user.posts.push(post._id);
                return res.status(200).json({ message: "Post added" })
            }
        })
    })


})

router.put("/updatePost/:postId", (req, res) => {

    const {title,description,skills} = req.body.data;
    console.log({title,description,skills})
    Post.findByIdAndUpdate(req.params.postId,{$set : {title : title,description : description,tags : skills}},(err,post)=>{

        console.log(post)
        if(err)
        return res.status(400).json({message : "error occured"})
        else
        {
            return res.status(200).json({message : "updated user"})
        }

    })


})

router.delete("/deletePost/:postId", (req, res) => {

    console.log(req.params.postId)
    
        //    Post.findById(req.params.postId,(err,post)=>{
        //     console.log(post)
        //    })
            Post.findByIdAndRemove(req.params.postId,(err,post)=>{

                console.log(post)
                if(err)
                return res.status(404).json({ message: "error occured" }) 
                else
                return res.status(200).json({ message: "post deleted" })
            })   
    
    
})

module.exports = router
