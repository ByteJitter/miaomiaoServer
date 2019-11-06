var UserModel=require('../models/users.js');


var index = async (req,res,next) =>{
    res.send({
        msg:'管理员',
        status:0
    })
}

var usersList=async(req,res,next)=>{
    var result=await UserModel.usersList()
    if(result){
        res.send({
            msg:'所有用户信息以全部获取',
            status:0,
            data:{
                usersList:result
            }
        })
    }
    else{
        res.send({
            msg:'用户信息获取失败',
            status:-1,
        })
    }
}

var updateFreeze=async(req,res,next)=>{
    var {email,isFreeze}=req.body;
    var result=await UserModel.updateFreeze(email,isFreeze);

    if(result){
            res.send({
                msg:'账户冻结成功',
                status:0
            })
    }
    else{
        res.send({
            msg:'账户冻结失败',
            status:-1
        })
    }
}





var deleteOne=async(req,res,next)=>{
    var {email} =req.body;
    var result=await UserModel.deleteOne(email);

    if(result){
        res.send({
            msg:'账号删除成功',
            status:0
        })
    }
    else{
        res.send({
            msg:'账号删除失败',
            status:-1
        })
    }
}



module.exports={
    index,
    usersList,
    updateFreeze,
    deleteOne
}