const express = require('express');
const { createUserValidationRules, validate, loginUserValidationRules} = require('../middleware/validators');
const { handleCreateUser, handleLoginUser } = require('../controller/user');
const { checkUserExistsWithotToken } = require('../service/auth');

const router = express.Router()

router.post('/create',createUserValidationRules(),validate,handleCreateUser);
router.post('/login',loginUserValidationRules(),validate,checkUserExistsWithotToken,handleLoginUser);

module.exports = router