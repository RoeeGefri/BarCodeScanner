import {Fab, TextareaAutosize, Paper} from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'
import {useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Form({setAddManually , barcode, barcode2 , setBarcode2 , setAddItem , itemAdded, setItemAdded }) {

    const [cookie, setCookie , removeCookie] = useCookies(['user'])
    const userId = cookie.userId

    const [title , setTitle] = useState("")
    const [quantity, setQuantity ] = useState(1)
    const [img , setImg] = useState("")
    const [ enteringToForm , setEnteringToForm] = useState(false)
    const [ showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        productName: title,
        quantity: 0,
        expireDate: ""
    })

    const [post, setPost] = useState(null);

    console.log("~~~~~~~~~ welcome to the form ~~~~~~~")

    // 7290000066264
    useEffect(() => {
        
        // if(barcode2 !== " "){
            // console.log("updating scanner...." , barcode.codeResult.code)
            // barcode2 = barcode.codeResult.code
            // console.log( "1barcode2:", barcode2, "barcode1:", barcode.codeResult.code)
        // }
        // if(barcode.codeResult.code[0]){
            
        // }

        if(barcode2 !== " "){
            console.log( "2barcode2:", barcode2)
            axios.get('http://localhost:5000/item?id=' + barcode2).then((response) => {
                console.log("the data that we got:" ,response.data)
                setPost(response.data)
                setShowForm(true)
                setTitle(response.data)
                console.log("dsaasdasddasadsdasdas " , response)
                setFormData({
                    productName: response.data,
                    quantity: quantity,
                    expireDate: ""
                })
            }).catch((error) => {
                setAddManually(false)
                setShowForm(false)
                setAddItem(false)
                console.log(error + "hjkasdfhjkadsfhjksdafjkhfadsjkhafdsjkhdafshjkdfas")
                alert("The scanned BarCode does not exists!")
            })

        }else{
            barcode2 = barcode.codeResult.code
            console.log( "2barcode2:", barcode2, "1:-----------", barcode.codeResult.code)
            axios.get('http://localhost:5000/item?id=' + barcode2).then((response) => {
                console.log("the data that we got:" ,response.data)
                setPost(response.data)
                setShowForm(true)
                setTitle(response.data)
                console.log("dsaasdasddasadsdasdas " , response)
                setFormData({
                    productName: response.data,
                    quantity: quantity,
                    expireDate: ""
                })

            }).catch((error) => {
                setAddManually(false)
                setShowForm(false)
                setAddItem(false)
                console.log(error + "hjkasdfhjkadsfhjksdafjkhfadsjkhafdsjkhdafshjkdfas")
                alert("The scanned BarCode does not exists!")
            })
        }
        
    }, [setShowForm]);



    const handleSubmit = async(e) => {
        console.log("trying to submit!")
        // console.log("the array sent is:" , {
        //     barcode:barcode.codeResult.code,
        //     name:formData.productName,
        //     expDate: formData.expireDate
        // })

        setShowForm(false)
        setAddManually(false)
        e.preventDefault() //prevent from refreshing
        if (barcode2 !== " ") {
            try {
                setItemAdded(true)
                setAddItem(false)
                const response = await axios.patch('http://localhost:5000/user/addItem', { 
                    id: userId,
                    item:{
                        barcode:barcode2,
                        name:formData.productName,
                        expDate: formData.expireDate,
                    },
                    // ############### fix this ###################
                    quantity: quantity
                    // ############### fix this ###################
    
    
                })
                //for re-rendering purposes
                
                
    
                // window.location.reload();
            } catch (error) {
                console.log(error)
            }

        }else {
            try {
                const response = await axios.patch('http://localhost:5000/user/addItem', { 
                    id: userId,
                    item:{
                        barcode:barcode.codeResult.code,
                        name:formData.productName,
                        expDate: formData.expireDate,
                    },
                    // ############### fix this ###################
                    quantity: quantity
                    // ############### fix this ###################
    
    
                })
                //for re-rendering purposes
                
                setItemAdded(true)
                setAddItem(false)
    
                // window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const handleChange = (e) => {
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        if(newData.productName === ""){
            newData.productName = title
        }
        setFormData(newData)
        console.log(newData)
    }


    const add = (e) => {
        e.preventDefault();

        const newData = {...formData}
        newData["quantity"] = (parseInt(formData["quantity"]) + 1)
        setFormData(newData)
        setQuantity(parseInt(newData["quantity"]))
        console.log(newData)
        console.log("add!")
    }

    const sub = (e) => {
        e.preventDefault();

        const newData = {...formData}
        if(parseInt(formData["quantity"]) > 1){
            newData["quantity"] = (parseInt(formData["quantity"]) - 1)
        setFormData(newData)
        setQuantity(parseInt(newData["quantity"]))
        console.log(newData)
        console.log("sub!")        
        }
        
    }

    var today = new Date()
    function formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }
    
        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    }


    useEffect(() => {

    },[add, sub])

    return (
        <div class="form-container">
            <form onSubmit={handleSubmit}>
                {/* <h1 className="form-title">Scan new item</h1> */}

                <div className="product">
                    {/* <img className="form-product-left" src={img} /> */}

                    <div className="form-product-right">
                        <label>
                            שם המוצר
                        </label>
                        <input
                            className='btn' 
                            type="text"
                            id="productName"
                            name="productName"
                            value={title}
                            required={true}
                            // onChange={(e) => handleChange(e)}
                            style={{width: 250}}
                        />
                    </div>
                </div>


                <div className="quantity" style={{marginTop: 30}}>
                    <div class="container-menu" onClick={sub} style={{ marginLeft: 120}}>
                        <input 
                        id="btn" 
                        type="checkbox" 
                        style={{background:"#FF5349"}}
                        />
                        <label style={{padding: 10}} for="btn">-</label>
                    </div>
                    
                    <label for="quantity" style={{marginLeft: 30}}>{quantity} יחידות</label>

                    <div class="container-menu" onClick={add} style={{margin:"0 100px 0 30px"}}>
                        <input 
                        id="btn" 
                        type="checkbox" 
                        />
                        <label style={{padding: 10, marginLeft: 20}} className="btn-plus" for="btn">+</label>
                    </div>
                </div>

                <div className="expire-date">
                    
                    <input 
                    type="date" 
                    id="expireDate"
                    name="date" 
                    onChange={(e) => handleChange(e)}
                    required={true}
                    // min={today.toLocaleDateString()}
                    max="2030-12-31"
                    data-date-inline-picker={true}
                    />
                    <label style={{marginLeft: 20}}>:תאריך תפוגה </label>
                </div>


                <div className="add-btn2">
                    <button className="inside-add-btn">New Item</button>
                </div>


            </form>
        </div>
    );
}

export default Form;
