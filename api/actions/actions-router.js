// Write your "actions" router here!

const express = require('express');
const { validateActionId, validateAction } = require('../actions/actions-middlware');
const Action = require('./actions-model');

const router = express.Router();

// .get()

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
  res.json(req.action);
})

// .post()

router.post('/', validateAction, (req, res, next) => {
  Action.insert({ description: req.description, notes: req.notes })
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

// .put()

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, { description: req.description, notes: req.notes })
    .then(updatedAction => {
      res.json(updatedAction)
    })
    .catch(next)
})

// .delete()

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id)
    res.json(req.action)
  } catch (err) {
    next(err)
  }
})


module.exports = router;