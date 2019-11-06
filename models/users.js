var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var Head =require('../untils/config.js');
var url=require('url');


var UserSchema=new mongoose.Schema({
    username:{type:String,required:true,index:{unique:true}},
    password:{type:String,required:true},
    email:{type:String,required:true,index:{unique:true}},
    date:{type:Date,default:Date.now()},
    isAdmin:{type:Boolean,default:false},        //区分管理员与非管理员
    isFreeze:{type:Boolean,default:false},       //账户是否冻结
    userHead:{type:String,default:url.resolve('http://localhost:3000/upload/','default.jpeg')}
});

var UserModel=mongoose.model('user',UserSchema);
UserModel.createIndexes();

var save=(data)=>{
    var user=new UserModel(data);
    return user.save()
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    });
};

var findLogin=(data)=>{
    return UserModel.findOne(data);
}

var updatePassword=(email,password)=>{
    return UserModel.update({email},{$set:{password}})
           .then(()=>{
               return true;
           })
           .catch(()=>{
               return false;
           });
}

var usersList=()=>{
    return UserModel.find();
}

var updateFreeze=(email,isFreeze)=>{
    return UserModel.update({email},{$set:{isFreeze}})
           .then(()=>{
               return true
           })
           .catch(()=>{
               return false
           })
}

var deleteOne=(email)=>{
    return UserModel.deleteOne({email:email},(err)=>{
        if(err){
            return false
        }
        else{
            return true
        }
    })
}

var updateUserHead=(username,userHead)=>{
    return UserModel.update({username},{$set:{userHead}})
                    .then(()=>{
                        return true;
                    })
                    .catch(()=>{
                        return false;
                    })
}

module.exports={
    save,
    findLogin,
    updatePassword,
    usersList,
    updateFreeze,
    deleteOne,
    updateUserHead
};