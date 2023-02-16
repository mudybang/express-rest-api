const controller = require("../controllers/post");
const verifyJwtToken = require('../middlewares/verifyJwtToken');

var express = require('express');
var router = express.Router();

router.get("/",[verifyJwtToken.verifyToken],controller.getData);
router.post("/",[verifyJwtToken.verifyToken],controller.createData);
router.put("/:id",[verifyJwtToken.verifyToken],controller.updateData);
router.delete("/:id",[verifyJwtToken.verifyToken],controller.deleteData);

module.exports = router;
