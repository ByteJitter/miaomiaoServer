var express = require('express');
var usersController=require('../controllers/users.js');
var router = express.Router();
var multer  = require('multer');                                    /* 路由中引入multer实现上传文件 */
var upload = multer({ dest: 'pulic/upload/' });                     /* 定义上传文件所在目录 */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',usersController.login);
router.post('/register',usersController.register);
router.get('/verify',usersController.verify);
router.post('/findPassword',usersController.findPassword);
router.get('/logout',usersController.logout);
router.get('/getUser',usersController.getUser);
router.get('/verifyImg',usersController.verifyImg);

router.post('/uploadUserHead',upload.single('file'),usersController.uploadUserHead);         /* 路由配置中插入multer配置 */

module.exports = router;
