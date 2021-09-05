const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

/* GET admin page. */
router.get('/', (req, res, next) => res.render('admin/admin.ejs'));

router.get('/users', userController.getList);
router.post('/users/create', userController.create);
router.post('/users/remove', userController.remove);

module.exports = router;
