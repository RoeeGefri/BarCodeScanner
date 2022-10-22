import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
// var Barcode = require('react-barcode');
import {Button} from '@material-ui/core';
import { useBarcode } from '@createnextapp/react-barcode';

import CreateList from './components/ListItems/CreateList'
import Form from './components/ListScanner/Form';
import BarcodeScanner from './components/ListScanner/BarcodeScanner';
import NavBar from './components/NavBar'

function List({list}) {
    const [cookie, setCookie , removeCookie] = useCookies(['user'])

    const userId = cookie.userId

    const [userText , setUserText] = useState("")
    const [userList , setUserList] = useState("")

    const [listUpdated, setListUpdated] = useState(false)


    const [itemDeleted, setItemDeleted] = useState(1)
    const [itemAdded, setItemAdded] = useState(false)

    const [barcode2, setBarcode2] = useState(' ');
    const [addManually , setAddManually] = useState(false)
    
        const getUserList = async () => {
            console.log("userId ====== " + userId)
            try {
                const response = await axios.get('http://localhost:5000/user/list?id='+userId)
                // console.log("GET DATA FROM DATABASE : ", response.data.data)
                setUserList(response.data.data)
                setListUpdated(true)
                setItemAdded(false)
            } catch(error) {
                console.log(error)
            }
        }

        const [shallWe , setShallWe] = useState(true)
        const rerender = () => {
            setShallWe(false)
            setItemDeleted(itemDeleted + 1)
        }

    // search input
    const handleChange = (e) => {
        const value = e.target.value.toLowerCase()
        setUserText(value)
    }

    const [addItem,setAddItem] = useState(false)
    const onClick = () => {
        if(!addItem){
            setAddItem(true)
        }else{
            setAddItem(false)
            setAddManually(false)
        }
        console.log("addItem? ", addItem)
    }

    useEffect(() => {
        getUserList()
    },[itemAdded])



    return (
        <div className="App">
            
            {/* <div style={{marginTop:30, marginBottom:30}}>
                <TextField onChange={handleChange} style={{width:320}}
                label="Barcode content" size="large" variant="outlined" color="secondary" 
                />
            </div>
            <div>
                <canvas id="mybarcode" ref={inputRef} />
            </div> */}

                    
            <div className="App-header">
                <div className='list' style={{ width: "90%"}}>
                    {!addItem && listUpdated && (
                    <div className="listDiv">

                        <NavBar user={userId}/>

                        <div className="m-t-20" style={{boxShadow: "0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)" ,display:"flex" , height: "10%", background: "#eea849" , border: "6px solid #35b1c3"}}>
                            <span className='list-title'>Expiration List</span>
                        </div>

                        <div className="createdList">
                            <CreateList userText={userText} itemDeleted={itemDeleted} setItemDeleted={setItemDeleted} userList={userList} setUserList={setUserList}/>
                        </div>
                        
                        <div>
                            <div className="search-wrapper">
                                <label for="search"></label>
                                <input 
                                    type="search"
                                    id="search"
                                    placeholder='Search for a product'
                                    onChange={handleChange}
                                    autocomplete="off"
                                />
                            </div>
                            <div onClick={onClick} className="add-btn">
                                <div className="inside-add-btn">New Item</div>
                            </div>
                        </div>
                        
                    </div>
                    )}

                    {addItem && ( 
                        <div className='scannerDiv'>
                            <div className="bar-scanner">
                                <BarcodeScanner addManually={addManually} setAddManually={setAddManually} barcode2={barcode2} setBarcode2={setBarcode2} setAddItem={setAddItem} itemAdded={itemAdded} setItemAdded={setItemAdded} style={{marginBottom: 20}}/>
                            </div>
                            <Fab 
                            style={{width: "40%", borderRadius: 10}} 
                            color="secondary"
                            onClick={onClick}
                            >
                                <ArrowBack /><span >Cancel</span>
                            </Fab>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )}

export default List;



