import User from "../modules/UserSchema.js";
import axios from "axios";
import ItemData from "../modules/ItemData.js";



export const createUser = async(req,res)=>{
    try{
        const data = req.body;
        let users = await User.find();
        users = users.filter(item => item.username === data.username || item.email === data.email);
        console.log(users);
        if(users.length == 0){
            const newUser = new User(data);
            newUser.save();
            res.status(200).send({data:newUser.id});
            return;
        }
        if(users[0].username === data.username){
            res.status(400).send({error:"username is taken"});
            return;
        }
        res.status(400).send({error:"email is taken"});
    }
    catch{
        res.status(400).send({error:"email or username is taken"})
    }
}


export const addItem = async(req,res)=>{

    const addToData = (list,item,quantity)=>{
        let i = 0;
        let length = list.length;
        let d1;
        let items = [];
        for(let j = 0 ; j < quantity ; j++){
            items.push(item);
        }

        if(length == 0){
            return items;
        }
        for(;i<length;i++){
            d1 = new Date(item.expDate);

            if(parseInt(item.barcode) < parseInt(list[i].barcode)){
                console.log(   list.slice(0,i).concat(...items).concat(...list.slice(i,length))  );
                return list.slice(0,i).concat(...items).concat(...list.slice(i,length));
            }
            if(parseInt(item.barcode) == parseInt(list[i].barcode) && d1 < list[i].expDate){
                console.log(  list.slice(0,i).concat(...items).concat(...list.slice(i,length))  );
                return list.slice(0,i).concat(...items).concat(...list.slice(i,length));
            }
        }
        console.log(list.concat(...items));
        return list.concat(...items);
    }

    console.log("ADD ITEM");
    try{
        const data = req.body;
        //console.log("add item's data: " , data);
        const user = await User.findById(data.id);
        //console.log("data.id:", data.id)
        //console.log("list is:",user.itemList);
        user.itemList = addToData(user.itemList,data.item,data.quantity);
        user.save();
        res.status(200).send(user.itemList);
    }
    catch{
        res.status(404).send({error:"user dont found"})
    }
}


export const deleteItem = async(req,res)=>{
    try{
        const data = req.body;
        const user = await User.findById(data.id);
        user.itemList = user.itemList.filter(item=> data.itemId !== item.id)
        user.save();
        res.status(200).send({data:user.itemList});
    }
    catch{
        res.status(400).send({error:"Error in Delete"});
    }
}



export const login = async(req,res)=>{
    try{
       const data = req.body;
       const users = await User.find();

       const user = users.filter(item => {
           return (item.username === data.username && item.password === data.password)
        })
       res.status(200).send({data:user[0].id});
    }
    catch{
        res.status(400).send({error:"user doesn't exist"});
    }
}


export const getList = async(req,res)=>{
    try{
        const data = req.query;
        console.log(data);
        const users = await User.find();
        
        const user = users.filter(item=> item.id === data.id);
        res.status(200).send({data: user[0].itemList});
    }
    catch{
        res.status(400).send({error:"Error in List"});
    }
}


export const getItemData = async(req,res)=>{
    console.log("start: " , req.query.id)

    let itemList = await ItemData.find().catch(error=>{res.status(400).send({error:'error with itemData'})});
    const barcode = req.query.id;
    
    itemList = itemList.filter(item=> {
        console.log(item.barcode)
        console.log(barcode)
        return item.barcode === barcode;
    });
    console.log(itemList);
    if(itemList.length != 0){
        console.log(3);
        res.status(200).send(itemList[0].name);
        return;
    }

    const targetURL = "https://chp.co.il/autocompletion/product_extended?term="+barcode+"&from=0&u=0.22891359532097144&shopping_address=&shopping_address_city_id=0&shopping_address_street_id=0";
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    try{
        const jsonFile = await axios.get(targetURL);
        const length = jsonFile.data.length
        if(length === 0){res.status(400).send({error:"Error in Data fetch"}); return;};
        console.log("222222222222" , length)
        console.log('1');
        //add the item to table
        const newItem = new ItemData({barcode:barcode, name:jsonFile.data[0].label});
        console.log(newItem);
        await newItem.save();
        console.log('2');
        res.status(200).send(jsonFile.data[0].label);//[0].value);
    }
    catch{
        res.status(400).send({error:"Error in Data fetch"})
    }


}