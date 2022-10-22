import React, { Component , useState } from 'react'
import Scanner from './Scanner'
import {Fab, TextareaAutosize, Paper} from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'
import { Link } from "react-router-dom";
import Form from "./Form";
import Quagga from 'quagga'

import BarcodeManual from './BarcodeManual'



class BarcodeScanner extends Component {
  state = {
    results: [],
    var: []
  }


  _scan = result => {
    if (this.state.isScanning === true) {
        this.setState({
            open: false,
            isScanning: false,
        });
        Quagga.offDetected();
        Quagga.offProcessed();
        document.getElementById('interactive').innerHTML = '';
        Quagga.stop();
    } else {
        this.setState({
            open: true,
            isScanning: true,
        });
        setTimeout(this._componentDidMount, 100);
    }
};

  _onDetected = result => {
    this.setState({ results: [] })
    this.setState({ results: this.state.results.concat([result]) })
    Quagga.stop();
  }


  // function handleChange(props) {
  //   alert("yeap..")
  //   return ;
  // }

  render() {
    return (
      <div className="App">
        <div className='bar-scanner'>
        
        {!(this.state.results[0] || this.props.addManually) && 
        <Paper variant="outlined" style={{margin:"0 auto", padding: 5,width:320, height:"100%", background: "#f7fffe"}}>
          <h2 style={{fontSize: 35,background:"#35b1c3", width: "100%"}}>Scan your product</h2>
          <Scanner onDetected={this._onDetected}/>
          <BarcodeManual setAddManually={this.props.setAddManually} barcode2={this.props.barcode2} setBarcode2={this.props.setBarcode2}/>
        </Paper>
        }

        {/* <h1 style={{border:"5px solid cyan"}}>{this.state.var}</h1> */}
        {/* <h1 style={{border:"5px solid cyan"}}>{this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scannnned'}</h1> */}

        { (this.props.addManually || this.state.results[0] )  && 
            <Form setAddManually={this.props.setAddManually} barcode2={this.props.barcode2} setBarcode2={this.props.setBarcode2} setAddItem={this.props.setAddItem} itemAdded={this.props.itemAdded} setItemAdded={this.props.setItemAdded} barcode={this.state.results[0]}/>
        }

      </div>
    </div>
    )
  }
}

export default BarcodeScanner
