import React, {useState} from 'react'
import Items from './Items'
import Form from '../ListScanner/Form'




function CreateList({userText , itemDeleted , setItemDeleted , userList , setUserList}) {

    const [itemsList , setItemsList] = useState("items-list-hide")
    const [showItems, setShowItems] = useState(false)
    let toggle = false;
    let previousVal = -1;

    const handleClick = (e) => {
        let state = e.target.parentElement.parentElement.children[1].children[0].style.display
        if(state === ""){
            state = "none"
        }
        console.log("state=" , state)
        if(state === 'none'){
            e.target.style.background = '#4aafac'
            e.target.parentElement.style.borderColor = "#35b1c3"
            e.target.innerHTML = "-"
            e.target.parentElement.parentElement.children[1].children[0].style.display = "block"
            // e.target.parentElement.parentElement.children[1].children[0].boxShadow = " 0 4px 4px rgba(240, 0, 0, 1)"
        }else{
            e.target.style.background = '#ff6f47'
            e.target.parentElement.style.borderColor = "#ff6f47"
            e.target.innerHTML = "+"
            e.target.parentElement.parentElement.children[1].children[0].style.display = "none"
        }
    }


    // sorting algorithem by barcode
    console.log("userList: ", userList)

    // userList.sort((a,b) => (a.barcode < b.barcode ? 1:-1))
    // .sort((a,b) => 
    // (a.barcode === b.barcode) ? ((a.expDate < b.expDate) 
    // ? 1 : -1) : -1)

    const [uniqueId , setUniqueId] = useState(0)

    return (
        <div>
            { 
            userList.map((item) => {

                if((item).name.toLowerCase().includes(userText)) {
                    let currentVal = item.barcode;
                    // setUniqueId(uniqueId+1)
                    // we encounter a new item
                    if(previousVal !== currentVal){
                        previousVal = item.barcode;
                        return (
                        <div className='item' key={previousVal}>
                            <div className='listItemParent'>
                                <div className='listItem'>
                                    <div className="itemLeft">{item.name}</div>
                                    <button onClick={handleClick} className='itemRight'>+</button>
                                </div>

                                <div>
                                    <Items setUserList={setUserList} uniqueId={uniqueId} itemDeleted={itemDeleted} setItemDeleted={setItemDeleted} itemsList={itemsList} userList={userList} currentItem={currentVal}/>
                                </div>
                            </div>


                        </div>
                        )
                    }
            }})}
        
        </div>
    )
}

export default CreateList;


