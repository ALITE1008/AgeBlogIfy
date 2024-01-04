const express = require('express');

const blog = require('../models/blog');
const comment = require('../models/comment');

const router = express.Router();



router.get('/add-Blog', (req, res) => {
  return res.render('add_blog', {
    user: req.user,
  });
})
router.post('/add-Blog', async (req, res) => {
  const { title, blog_body, coverimage } = req.body;

  const Blog = await blog.create({
    coverImgUrl: coverimage,
    title: title,
    body: blog_body,
    createdBy: req.user.id,
  });

  return res.redirect('/');
});

router.get('/:id', async (req, res) => {

  const Blog = await blog.findById(req.params.id).populate('createdBy');
  const comments = await comment.find({ blogId: req.params.id }).populate('createdby');
  return res.render('blog', {
    blog: Blog,
    user: req.user,
    comments: comments,
  });
})

router.post('/comment/:id', async (req, res) => {

  comment.create({
    content: req.body.content,
    blogId: req.params.id,
    createdby: req.user.id,
  });

  return res.redirect(`/blog/${req.params.id}`);
});

module.exports = router;