/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const projectController = require('./../controllers/projectController');
const authController = require('./../controllers/authController');
const router = express.Router();

//Getting project / projects does not require neither authentication nor authorization.
//Crud operations on projects require admin privileges
router
  .route('/')
  .get(projectController.getAllProjects)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.createProject
  );
router
  .route('/:id')
  .get(projectController.getProject)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.updateProject
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    projectController.deleteProject
  );

module.exports = router;
