const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

/** Test Route */
router.get('/test', userController.test);

/** POST Create Route */
router.post('/create', userController.user_create);

/** Read Route */
router.get('/:id', userController.user_details);

/** Update Route */
router.put('/:id/update', userController.user_update);

/** Delete Route */
router.delete('/:id/delete', userController.user_delete);

module.exports = router;
