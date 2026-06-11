const express = require("express");
const { register, login, profile } = require("./auth.controller.js");
const  {authenticate} = require("../../middlewares/auth.middleware.js");


const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.get('/profile', authenticate,profile);
module.exports = router;