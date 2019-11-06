var mongoose = require('mongoose')
var nodemailer=require('nodemailer')

var Mongoose={
    url:'mongodb://localhost:27017/miaomiao',
   /*  options = {
        useMongoClient: true,
        poolSize: 5, // 连接池中维护的连接数
        reconnectTries: Number.MAX_VALUE,
        keepAlive: 120,
    }, */
    connect(){
        mongoose.connect(this.url,{useNewUrlParser:true,poolSize:15000}/* ,this.options */,(err)=>{
            if(err){
                console.log('访问数据库是失败');
                retrun;
            }
            console.log('访问数据库成功');
        })
    },
    disconnect(){
        mongoose.disconnect();
    }
}


var Email={
    config:{
        host: "smtp.qq.com",
        port: 587,
        auth: {
        user: '508299098@qq.com', // generated ethereal user
        pass: 'wcgenahpubchbggd' // generated ethereal password
        }
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    },
    get time(){
        return Date.now();
    }
    /*
    get info(){
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
          });
    }
    */
};

var Head={
    baseUrl:'http://localhost:3000/upload/'
}


module.exports={
    Mongoose,
    Email,
    Head
};