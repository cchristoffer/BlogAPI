/* eslint-disable import/no-useless-path-segments */
const BlogPost = require('./../models/blogPostModel');
const factory = require('./handlerFactory');

//Sets author to user.id gained from protect middleware
exports.setAuthorUserIds = (req, res, next) => {
  req.body.author = req.user.id;
  next();
};

//No privileges required
exports.getAllBlogPosts = factory.getAll(BlogPost);
exports.getBlogPost = factory.getOne(BlogPost, { path: 'comments' });
//Admin privileged
exports.updateBlogPost = factory.updateOne(BlogPost);
exports.deleteBlogPost = factory.deleteOne(BlogPost);
exports.createBlogPost = factory.createOne(BlogPost);
