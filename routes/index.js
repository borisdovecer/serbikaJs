const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// GET home page
router.get('/', (req, res, next) => res.render('index'));

// GET POST login/register
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.post('/login', userController.postLogin);
router.post('/logout', userController.postLogout);

// User routes
router.get('/users', userController.getList);
router.post('/users/create', userController.create);
router.post('/users/update/:id', userController.update);
router.post('/users/remove/:id', userController.remove);

module.exports = router;
