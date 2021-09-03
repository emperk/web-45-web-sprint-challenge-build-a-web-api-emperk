// Write your "projects" router here!

const express = require('express');
const { validateProjectId, validateProject } = require('../projects/projects-middleware');
const Project = require('./projects-model');

const router = express.Router();

// .get()

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.json(projects)
      // console.log('the projects:', projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => {
  res.json(req.project)
  // console.log(req.project)
})

// .post()







module.exports = router;