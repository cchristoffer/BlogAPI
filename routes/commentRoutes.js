/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');
const router = express.Router({ mergeParams: true });
//Getting project / projects does not require neither authentication nor authorization.
//Crud operations on projects require admin privileges

router
  .route('/')
  .post(
    authController.protect,
    commentController.setCommentUserIds,
    commentController.createComment
  );
router
  .route('/:id')
  .get(commentController.getComment)
  .patch(
    authController.protect,
    commentController.checkUserId,
    commentController.updateComment
  )
  .delete(
    authController.protect,
    commentController.checkUserId,
    commentController.deleteComment
  );

module.exports = router;
