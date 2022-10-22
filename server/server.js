import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import nodeSchedule from "node-schedule"
import User from "./modules/UserSchema.js";
import postRoute from './routes/posts.js';
import nodemailer from 'nodemailer';



const CONNECTION_URL="mongodb+srv://tomermor:Te709709@cluster0.ra2cj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT||5000


mongoose.connect(CONNECTION_URL)
.then(()=>{

    const app = express()

    app.use(cors())
    app.use(express.json());
    app.listen(PORT, ()=> console.log('Connect to DATABASE! on port:'+PORT))


    app.use('/',postRoute);

    
    nodeSchedule.scheduleJob('0 0 * * *', async()=>{
        let transporter = nodemailer.createTransport({
            service:"gmail",
            secure: false,
            port: 25,
            auth:{
                user:'sexylooter@gmail.com',
                pass:'iafwewpjwdbiyzll'
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let mailOption ={
            from:'planocooperation@gmail.com',
            to:'',
            subject:'Expired List',
            text:''
        }

        try{
            let sendMail = false;
            let message = "";
            const users = await User.find();
            console.log(users);
            users.map(item=>{
                sendMail = false;
                message = item.username+"\n";
                item.itemList.map(item1=>{
                    if(item1.expDate < new Date()){
                        message += item1.name+"\n";
                        message += item1.expDate+"\n\n";
                        sendMail = true;
                    }
                })
                console.log("-----------------");
                mailOption.to = item.email;
                mailOption.text = message;
                if(sendMail){
                    console.log(mailOption);
                    console.log(message);
                    transporter.sendMail(mailOption,(error,info)=>{
                        if(error){
                            console.log(error.message);
                        }else{
                            console.log("Email sent:\n"+info.response);
                        }
                    })
                }
            })


        }
        catch{
            console.log("error in expire date");
        }
    }); 
})
.catch((e)=>{ console.log(e.message) })

//mongoose.set('useFindAndModify', false)

//route