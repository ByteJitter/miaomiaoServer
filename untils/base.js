var crypto=require('crypto');
var captcha=require('trek-captcha');

var setCrypto=(info)=>{                      
    return  crypto.createHmac('sha256','sf&*&$&^#$$%$#')             /* sha256：采用的加密算法  ,info:所要加密的数据,乱码为加密串,hex:16进制 */
            .update(info)
            .digest('hex');               /* 原生node crypto模块实现加密 */
    
};

var createVerify=(req,res)=>{               /* 创建登录图片验证码 ,trek-captcha实现*/
    return  captcha()
            .then((info)=>{
                req.session.verifyImg=info.token;             /* 生成验证码并将验证码的值存储到session，用来与用户验证 */
                return info.buffer;                           /* 返回在前端显示的验证码图片 */
            })
            .catch();
}


module.exports={
    setCrypto,
    createVerify
}