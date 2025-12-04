const express = require('express')
const upload = require('../middleware/upload')
const { createBLog, getAllBlog } = require('../controllers/blog.controller')

const Router = express.Router()

Router.post('/create-blog',upload,createBLog)
Router.get('/all-blog',getAllBlog)

module.exports = Router