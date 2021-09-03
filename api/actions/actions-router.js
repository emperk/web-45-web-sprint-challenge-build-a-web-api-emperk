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




module.exports = router;