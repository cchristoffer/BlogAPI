const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: [true, 'A comment must have contain text'],
    },
    blogPost: {
      type: mongoose.Schema.ObjectId,
      ref: 'BlogPost',
      required: [true, 'Comment must belong to a blog post.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to an author.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Populates comments with names and photo
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'Fname Lname photo',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
