var controller = require("../controllers/auth");
const verifyAuth = require('../middlewares/verifyAuth');
var express = require('express');
var router = express.Router();

router.post("/register",[verifyAuth.registerDuplicateEmail],controller.doRegister);
router.post("/login",[verifyAuth.loginCheckEmail],controller.doLogin);

module.exports = router;
