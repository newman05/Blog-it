const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/images/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

router.get('/add-new', (req, res) => {
    if (!req.user) return res.redirect('/user/login');
    res.render('addBlog', { user: req.user });
});

router.post('/', upload.single('coverImage'), async (req, res) => {
    const { title, body } = req.body;

    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/images/${req.file.filename}`
    });

    return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
