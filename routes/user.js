const router = require('express').Router();
const {getUser, createUser, deleteUser, updateUser} = require('../controllers/userController.js');
const {verifyToken, verifyAndAuthorization, verifyVendor, verifyDriver} = require('../middleware/verifyToken.js');

router.get('/', verifyAndAuthorization, getUser);
router.post('/', verifyAndAuthorization, createUser);
router.put('/:id', verifyAndAuthorization, updateUser);
router.delete('/:id', verifyAndAuthorization, deleteUser);

module.exports = router;
