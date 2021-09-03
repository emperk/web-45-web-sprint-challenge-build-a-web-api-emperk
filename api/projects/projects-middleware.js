// add middlewares here related to projects
const Project = require('../projects/projects-model');

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if(!project) {
      res.status(404).json({
        message: 'the project you are looking for with that ID does not exist'
      })
    } else {
      req.project = project
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'there seems to be an issue with finding the user?',
      err: err.message,
      stack: err.stack,
    })
  }
}

function validateProject(req, res, next) {
  const { name, description } = req.body
  if (!name || !name.trim() || !description) {
    res.status(400).json({
      message: 'You seem to be missing the required input fields'
    })
  } else {
    req.name = name
    req.description = description
    next()
  }
}

module.exports = {
  validateProjectId,
  validateProject
}