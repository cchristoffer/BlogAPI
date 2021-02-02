/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const blogPostController = require('./../controllers/blogPostController');
const authController = require('./../controllers/authController');
const commentRouter = require('./../routes/commentRoutes');

const router = express.Router();

router.use('/:blogPostId/comments', commentRouter);
//Getting BlogPost / BlogPost does not require neither authentication nor authorization.
//Crud operations on BlogPost require admin privileges
router
  .route('/')
  .get(blogPostController.getAllBlogPosts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    blogPostController.setAuthorUserIds,
    blogPostController.createBlogPost
  );
router
  .route('/:id')
  .get(blogPostController.getBlogPost)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    blogPostController.updateBlogPost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogPostController.deleteBlogPost
  );

module.exports = router;
