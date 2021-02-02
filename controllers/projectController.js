/* eslint-disable import/no-useless-path-segments */
const Project = require('./../models/projectModel');
const factory = require('./handlerFactory');

//No privileges required
exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
//Admin privileged
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
exports.createProject = factory.createOne(Project);
