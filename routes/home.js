const express = require('express');
const blog = require('../models/blog');

const router = express.Router();


router.get('/' , async (req , res)=>{

    const allBlogs = await blog.find({});

    res.render('homePage',{
       user:req.user,
       blog:allBlogs,
    });
 })

 router.get('/logout',(req,res)=>{

   return  res.clearCookie('token').redirect('/');
    
 })

module.exports = router;