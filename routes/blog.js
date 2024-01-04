const express = require('express');

const blog = require('../models/blog');
const comment = require('../models/comment');


const multer = require('multer')
const path = require('path');
const { log } = require('console');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/upload"))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.get('/add-Blog', (req, res) => {
  return res.render('add_blog', {
    user: req.user,
  });
})
router.post('/add-Blog', upload.single('coverimage'), async (req, res) => {
  const { title, blog_body ,imgLink } = req.body;

  const Blog = await blog.create({
    imgLink:imgLink,
    // coverImgUrl: `/upload/${req.file.filename}`,
    title: title,
    body: blog_body,
    createdBy: req.user.id,
  });

  return res.redirect('/');
});

router.get('/:id', async (req, res) => {

  const Blog = await blog.findById(req.params.id).populate('createdBy');
  const comments = await comment.find({ blogId: req.params.id }).populate('createdby'); 
    console.log(comments);
  return res.render('blog', {
    blog: Blog,
    user: req.user,
    comments:comments,
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