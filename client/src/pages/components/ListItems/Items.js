import React, {useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function Items({setUserList , uniqueId , itemDeleted , setItemDeleted , itemsList, userList , currentItem}) {
    const [cookie, setCookie , removeCookie] = useCookies(['user'])
    const [itemId, setItemId] = useState("")
    const userId = cookie.userId

    
    const getTitleAndImage = async () => {
        try {
            const response = await axios.get('http://localhost:5000/item/id='+userId)
            console.log("GET DATA FROM BARCODE : ", response.data)

        } catch(error) {
            console.log(error)
        }
    }

    async function handleClick(item) {
        try {
            console.log("delete clicked!")
            console.log("item: ", item)
            const response = await axios.patch('http://localhost:5000/user/deleteItem', {
                id: userId,
                itemId: item._id
            })

            console.log("response: ", response)
            // window.location.reload()
            setItemDeleted(itemDeleted + 1)
            setUserList(response.data.data)
        } catch(error) {
            console.log(error)
        }
    }

    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const todayInStr = dd + '/' + mm + '/' + yyyy;



// ---------------
    function checkTime(item){
        console.log(item.getDate())
        // console.log("here....." , item.getTime() - today.getTime())

        var minutes = Math.floor((item.getTime() - today.getTime()) / 60000);
        var hours = (minutes / 60);
        var days = hours / 24;

        if(days <= 0){
            return 0;
        }else if(days <= 1){
            return 1;
        }else{
            return 2;
        }
    }


    const soonExpire = (item) => {
        const val = checkTime(item);
        if(val === 0){
            return "listItem2Danger"
        }else if(val === 1){
            return "listItem2Warning"
        }else{
            return "listItem2"
        }
    }

    const addDate = (item) => {
        const newDate = new Date(item.expDate)
        return (
                <div className={soonExpire(newDate)}>
                    {/* <div className={soonExpire(item)}> {stringDate(item.expireDate)}</div> */}
                    <div className='itemLeft2' style={{color:"black"}}>{newDate.getDate() + "/" + (newDate.getMonth()+1) + "/" + (newDate.getYear() - 100)}</div>
                    <div onClick={() => handleClick(item)} className='itemRight2'>X</div>
                </div>
        )
    }

    const pushItem = userList.map((item) => {
        if(item.barcode === currentItem){
            return (
                <div className='item2'>
                    <div className='listItemParent2'>
                        {addDate(item)}
                    </div>
                </div>
            )
        }
    })
    


    return (
        <div className='items-list' key={uniqueId}>
            {pushItem}
        </div>
    )
}

export default Items;


