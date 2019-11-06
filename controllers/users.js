var {Email,Mongoose}=require('../untils/config.js');
var UserModel=require('../models/users.js');
var {setCrypto,createVerify}=require('../untils/base.js');      /* node自带的加密 */
var fs=require('fs');               /*  node的文件系统 */


var login = async (req,res,next) => {              //async用于异步处理
    Mongoose.connect()
    var {username,password,verifyImg}=req.body;

    if(verifyImg!=req.session.verifyImg){
        res.send({
            msg:'验证码输入有误',
            status:-3
        })
        return;
    }

    var result=await UserModel.findLogin({
        username,
        password:setCrypto(password)
    });

    if(result){
        req.session.username=username;
        req.session.isAdmin=result.isAdmin;
        req.session.userHead=result.userHead;
        if(result.isFreeze){           //判断账户冻结状态
            res.send({
                msg:"账号已冻结",
                status:-1
            });
        }
        else{
            res.send({
                msg:"登录成功",
                status:0
            });
        }
    }
    else{
        res.send({
            msg:"登录失败",
            status:-2
        });
    }
    Mongoose.disconnect();
};



var register = async (req,res,next) => {
    Mongoose.connect();
    var {username,email,password,verify} =req.body;

    if((Email.time-req.session.time)/1000>=120){
        res.send({
            msg:'验证码已过期,请重新发送',
            status:0
        })
        return;
    }
    if(email!==req.session.email||verify!==req.session.verify){
        res.send({
            msg:验证码错误,
            status:-1
        })
    }

    var result=await UserModel.save({
        username,
        email,
        password:setCrypto(password),
        verify
    });

    if(result){
        res.send({
            msg:"注册成功",
            status:-2
        })
    }
    else{
        res.send({
            msg:"注册失败",
            status:-3
        })
    }
    Mongoose.disconnect();



};





var verify = async (req,res,next) => {
    Mongoose.connect()
    var email=req.query.email;          //取到发起请求的url中email赋值字段
    var verify=Email.verify;

     req.session.verify=verify;          //通过session(会话控制)在服务器端存储数据
     req.session.email=email;
     req.session.time=Email.time;

    var mailoption={                    //邮件配置
        from: '508299098@qq.com',
        to: email,
        subject: '喵喵网邮箱验证',
        text:'验证码:'+verify
    }

    Email.transporter.sendMail(mailoption,(err)=>{
        if(err){
            res.send({
                msg:'邮件发送失败',
                status:-1
            });
        }
        else{
            res.send({
                msg:'邮件发送成功',
                status:0
            });
        }
    });          //发送邮件
    Mongoose.disconnect();

}



var logout = async (req,res,next) => {
    Mongoose.connect()
    req.session.username='';

    res.send({
        msg:'登出成功',
        status:0
    })
    Mongoose.disconnect();
};



var getUser = async (req,res,next) => {
    Mongoose.connect()
    if(req.session.username){
        res.send({
            msg:'已登录',
            status:0,
            data:{
                username:req.session.username,
                isAdmin:req.session.isAdmin,
                userHead:req.session.userHead
            }
        });
    }
    else{
        res.send({
            msg:'未获取到用户信息',
            status:-1
        })
    }
    Mongoose.disconnect();
};



var findPassword = async (req,res,next) => {
    Mongoose.connect()

    var {email,password,verify} = req.body;

    if(email===req.session.email && verify===req.session.verify){
        var result = await UserModel.updatePassword(email,setCrypto(password));
        if(result){
            res.send({
               msg:'密码修改成功',
               status:0
            });
        }
        else{
            res.send({
                msg:'密码修改失败',
                status:-1
            });
        }
    }
    else{
        res.send({
            msg:'验证码错误',
            status:-1,
        });
    }
    Mongoose.disconnect();
};


var verifyImg=async(req,res,next)=>{
    Mongoose.connect()
    var result=await createVerify(req,res);
    if(result){
        res.send(result)
    }
    Mongoose.disconnect();
}

var uploadUserHead=async(req,res,next)=>{
    Mongoose.connect()
    await fs.rename('public/upload/'+req.file.filename,'public/upload/'+req.session.username+'.jpg')
    Mongoose.disconnect();
    
}




module.exports={                 //使用module.exports，此模块引入后可作为对象使用;
    login,register,verify,logout,getUser,findPassword,verifyImg,uploadUserHead
}