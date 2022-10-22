
import {Fab , TextField, Grid, ButtonGroup} from '@material-ui/core'
import React, {useState , useEffect} from 'react'
import { useBarcode } from '@createnextapp/react-barcode';
import {ArrowBack, GetApp} from '@material-ui/icons'

const BarcodeManual = ({setAddManually , barcode2 , setBarcode2}) => {


    const handleChange = (event) => {
        console.log("the value is: " , barcode2)
        setBarcode2(event.target.value ? event.target.value : -99);

    };

    const { inputRef } = useBarcode({
        value: barcode2,
        options: {
            background: '#ffffff',
        }
    })

    const onClick = () => {
        console.log(barcode2)
        setAddManually(true)
    }

    

    return (
        <div >
            <div style={{marginTop:30, marginBottom:30}}>
                <TextField 
                onChange={handleChange}
                label="Barcode content" size="large" variant="outlined" color="primary" 
                />
            </div>
            <div>
                <canvas id="mybarcode" ref={inputRef} /> 
            </div>
            
            <Fab 
            style={{width: "50%", borderRadius: 10, marginBottom: 20}}
            color="primary"
            onClick={onClick}
            >
            <span >Manual Search</span>
            </Fab>
        </div>
    )
}

export default BarcodeManual