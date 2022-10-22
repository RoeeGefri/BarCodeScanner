import React, {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'


const NavBar = ({user}) => {

    const [cookie, setCookie , removeCookie] = useCookies(['user'])
    const navigate = useNavigate()

    const onClick = () => {
        removeCookie('userId', cookie.userId)
        navigate('/')
    }
    
    return (
        <div style={{height:"5%", marginTop: "5%"}}>
            <h2 onClick={onClick} style={{fontSize: 40, background: "#FF5349", width: "50%", margin: "0 auto"}}>Log-Out</h2>
        </div>
    )
}

export default NavBar