const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A blog post must have a title'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A blog post must have a description'],
    },
    tags: {
      type: [String],
    },
    coverimg: {
      type: String,
    },
    sectionOne: {
      sectionTitle: String,
      sectionText: String,
      sectionImg: String,
      gist: String,
    },
    sectionTwo: {
      sectionTitle: String,
      sectionText: String,
      sectionImg: String,
      gist: String,
    },
    sectionThree: {
      sectionTitle: String,
      sectionText: String,
      sectionImg: String,
      gist: String,
    },
    sectionFour: {
      sectionTitle: String,
      sectionText: String,
      sectionImg: String,
      gist: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A blogpost must have an author.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    references: [String],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Virtually populates words with numbers of words in all sections
blogPostSchema.virtual('words').get(function () {
  return (
    this.sectionOne.sectionText.split(' ').length +
    this.sectionTwo.sectionText.split(' ').length +
    this.sectionThree.sectionText.split(' ').length +
    this.sectionFour.sectionText.split(' ').length
  );
});

//Virtually populates timeToRead with words/160. Estimated that user can read 160 words per minute.
blogPostSchema.virtual('timeToRead').get(function () {
  return parseInt(this.words / 160) + ' minutes';
});

//Allows us to use populate options in our factory handler to virtually populate comments where localField _id === foreignField blogPost in the Comment model.
blogPostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'blogPost',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() Creates slug for model
blogPostSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

//Virtually populates authors attributes
blogPostSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'Fname Lname email photo',
  });
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
