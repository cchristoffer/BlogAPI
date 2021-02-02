/* eslint-disable import/no-useless-path-segments */
const Comment = require('./../models/commentsModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Sets correct ids for blogPost and User. (user.id from protect middleware)
exports.setCommentUserIds = (req, res, next) => {
  req.body.blogPost = req.params.blogPostId;
  if (req.user) {
    req.body.user = req.user.id;
  }
  next();
};

//Checks if current logged in user is the same as the author of the comment.
exports.checkUserId = catchAsync(async (req, res, next) => {
  const commentUserId = await Comment.findById(req.params.id);
  console.log(commentUserId.user._id);
  console.log(req.user.id);
  if (req.user.id != commentUserId.user._id) {
    return next(new AppError('You can only update your own comments.', 401));
  }
  next();
});

exports.getComment = factory.getOne(Comment);
//Protected middlewares in route
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.createComment = factory.createOne(Comment);
