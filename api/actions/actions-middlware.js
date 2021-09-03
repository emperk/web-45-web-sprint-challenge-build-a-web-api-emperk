// add middlewares here related to actions
const Action = require('../actions/actions-model');

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id)
    if (!action) {
      res.status(404).json({
        message: 'the action with that ID does not exist'
      })
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'there was an issue with finding the action',
      err: err.message,
      stack: err.stack,
    })
  }
}

function validateAction(req, res, next) {
  const { description, notes, completed } = req.body
  if (!description || !description.trim() || !notes || !notes.trim() || !completed) {
    res.status(400).json({
      message: 'You are missing the required input fields'
    })
  } else {
    req.description = description
    req.notes = notes
    req.completed = completed
    next()
  }
}


module.exports = {
  validateActionId,
  validateAction
}