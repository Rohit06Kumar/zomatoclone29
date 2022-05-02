import React from "react";
import axios from "axios";
import Modal from 'react-modal';
import queryString from 'query-string'
import '../Style/Details.css'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-45%',
      transform: 'translate(-50%, -50%)',
      maxWidth:'100%',
      height:'60%',
      backgroundColor:'bisque',
      borderColor:'red'
    },
  };


  const customStylePayment = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-45%',
      transform: 'translate(-50%, -50%)',
      height:'80%',
      backgroundColor:'bisque',
      borderColor:'red'
    },
  };  

export default class Details extends React.Component{
    constructor(){
        super();
        this.state={
            restaurant: {},
            inputModal:false,
            paymentModal:false,
            restauranId:undefined,
            itemList: [],
            subTotal: 0,
            fname: undefined, 
            lname: undefined,
            email: undefined,
            contactno: undefined,
            address: undefined,
            landmark: undefined,
            address2: undefined,
            states: undefined,
            city: undefined,
            zip: undefined,
            modeofpayment: 1
        }
    }

    componentDidMount(){
        const qs = queryString.parse(this.props.location.search);
        const {restaurant} = qs
        axios({
            method:'GET',
            url:`http://localhost:1234/restaurant/${restaurant}`,
            headers:{'content-type':'application/json'},
        })
            .then(response=>{
                this.setState({restaurant:response.data.restaurant,restauranId:restaurant})
            })
            .catch(err=> console.log(err))
    }

    handleModal = (state, value) =>{
        this.setState({[state]:value, subTotal:0})
    }

    getMenuItem = () =>{
        const{restauranId} = this.state;
        axios({
            method:'GET',
            url:`http://localhost:1234/items/${restauranId}`,
            headers:{'content-type':'application/json'},
        })
            .then(response=>{
                this.setState({itemList:response.data.itemlist})
            })
            .catch(err=> console.log(err))
    }

    addItems = (index, inputOperation) =>{
        let total = 0
        const Items = [...this.state.itemList]
        let Item = Items[index]

        if(inputOperation == 'add'){
            Item.qty++;
        }else{
            Item.qty--;
        }
        Items[index] = Item;

        Items.map(item =>{
            total += item.qty * item.price;
        })

        this.setState({itemList: Items, subTotal: total})

    }

    handleInputChange = (state, event) =>{
        this.setState({[state]:event.target.value})
        event.preventDefault();
    }

    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {

        return fetch(`http://localhost:1234/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    makePayment = (event) => {
        const { subTotal,email,modeofpayment } = this.state;
        if (modeofpayment == 1){
            this.props.history.push('/final')
        }
        else{
            this.getData({ amount: subTotal, email}).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                this.post(information)
            })
        }
        
        event.preventDefault();
    }

    handlePreceedPayment = (event) => {
        const{fname, lname, email, contactno, address, landmark, address2, states, city, zip, modeofpayment}= this.state;
        // alert(modeofpayment)
        if(modeofpayment == 1){
            this.props.history.push('/final')
        }
        event.preventDefault();
    }

    handlePayment = (state, value) =>{
        const{subTotal, inputModal} = this.state;
        if(subTotal>0){
            this.setState({[state]:value, inputModal:false})
            // this.paymentModal();
        }else{
            alert('Please Add Items Than Proceed Further')
        }
    }

    handleBackPaymentModal = (state, value) => {
        const{paymentModal} = this.state;
        this.setState({[state]: value, paymentModal: false})
    }

    render(){
        const {restaurant, inputModal, paymentModal,itemList,subTotal} = this.state;

        return(
            <div style={{'backgroundColor': 'white', 'height':'100%'}}>
                <div className="container-fluid" style={{'height':'100%'}}>
                    <img src={`./${restaurant.image}`} alt="no image" width="100%" height="50%"/>
                    <div className="row" style={{'margin': '5px', 'height':'50%'}}>
                        <div className="col">
                            <h2 style={{"fontWeight": 'bold', 'color': 'royalblue'}}>{restaurant.name}</h2>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="tab" style={{'position': 'absolute'}}>
                                            <input type="radio" id="tab-1" name="tab-group" checked/>
                                            <label htmlFor="tab-1">Overview</label>
                                            <div className="Content">
                                                <div style={{'fontWeight':'bold', 'fontSize':'large', 'fontFamily':'fantasy'}}>About This Place</div>
                                                <div style={{'lineHeight':'1.5'}}>
                                                    <div style={{'fontWeight':'bold', 'fontSize':'medium'}}>Cuisine</div>
                                                    <div>{restaurant && restaurant.cuisine && restaurant.cuisine.map(cuisine => `${cuisine.name} `)}</div>
                                                </div>
                                                <div style={{'lineHeight':'1.5'}}>
                                                    <div style={{'fontWeight':'bold', 'fontSize':'medium'}}>Average Cost</div>
                                                    <div>&#8377;{restaurant.min_price} for two people (approx)</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab" style={{'position': 'absolute', 'left': '130px'}}>
                                            <input type="radio" id="tab-2" name="tab-group"/>
                                            <label htmlFor="tab-2">Contact</label>
                                            <div className="Content" style={{'position': 'relative','left': '-101px'}}>
                                            <div style={{'lineHeight':'1.5'}}>
                                                    <div style={{'fontWeight':'bold', 'fontSize':'medium'}}>Phone Number</div>
                                                    <div>{restaurant.contact_number}</div>
                                                </div>
                                                <div style={{'lineHeight':'1.5'}}>
                                                    <div style={{'fontWeight':'bold', 'fontSize':'medium'}}> Address</div>
                                                    <div style={{'fontWeight':'bold', 'fontSize':'medium'}}>{`${restaurant.name}, `}</div>
                                                    <div>{`${restaurant.locality} - ${restaurant.city}` }</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <button className="onlineOrder" onClick={() => {this.handleModal('inputModal', true); 
                                            this.getMenuItem()}}>Place Online Order</button>
                                    </div>
                                </div>
                                <hr />
                        </div>
                    </div>
                </div>
                <Modal
                isOpen={inputModal}
                style={customStyles}
                id='model'
                contentLabel="Example Modal">
                    <div>
                        <i class="fa fa-close" onClick={() => this.handleModal('inputModal', false)} style={{'float':'right', 'cursor':'pointer'}}></i>
                        <div className="containe-fluid">
                            <div className="row">
                                <div className="restaurant"> {restaurant.name} </div>
                                <div className="Sum"> Sub Total : {subTotal} </div>
                                <button className="payNowBttn" onClick={() => this.handlePayment('paymentModal', true)}>Pay Now</button>
                                {itemList.map((Item, index) => {
                                    return(
                                        <div className="modelItemgroup">
                                            <div className="row modelitem">
                                                <div className="col-9">
                                                    <div style={{'font-weight':'700'}}>{Item.name}</div>
                                                    <div>&#8377; {Item.price}</div>
                                                    <div style={{'fontSize':'13px'}}>{Item.description}</div>
                                                </div>
                                                <div className="col-3">
                                                    <img className="imgModel" src={`./${Item.image}`} alt="no Image" />
                                                    {Item.qty == 0? <div>
                                                        <button className="addModel" onClick={() => this.addItems(index, 'add')}>Add</button>
                                                    </div>: <div className="addModel">
                                                            <button style={{'width':'12px'}} onClick={() => this.addItems(index, 'subtract')} >-</button>
                                                            {/* <div style={{'display': 'inline-block'}}> */}
                                                            <p style={{'display': 'inline-block','margin': 'inherit'}}>{Item.qty}</p>
                                                            {/* </div> */}
                                                            <button style={{'float':'right'}} onClick={() => this.addItems(index, 'add')} >+</button>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* pYement Modal */}
                <Modal
                isOpen={paymentModal}
                style={customStylePayment}
                id='paymentmodel'
                contentLabel="Example Modal">
                    <div>
                        <div style={{'text-align': 'center','font-size': 'large','font-weight': '500'}}>
                            <span style={{'border-bottom':'2px solid red'}}>Contact Address</span>
                        </div>
                    <form onSubmit={this.makePayment}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="fname">First Name<span><b>*</b></span></label>
                                <input id="fname" name="fname" type="text" className="form-control" placeholder="First name" onChange={(event) => this.handleInputChange('fname',event)} required/>
                            </div>
                            <div className="col">
                                <label htmlFor="lname">Last Name<span><b>*</b></span></label>
                                <input id="lname" name="lname" type="text" className="form-control" placeholder="Last name" onChange={(event) => this.handleInputChange('lname',event)} required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="inputEmail4">Email<span><b>*</b></span></label><br />
                                <input type="email" id="inputEmail4" placeholder="Email" className="form-control" validateEmail="anystring@anystring.anystring" onChange={(event) => this.handleInputChange('email',event)} required/>
                            </div>
                            <div className="col">
                                <label htmlFor="mobileno">Mobile No.<span><b>*</b></span></label>
                                <input type="tel" pattern="[6-9]{1}[0-9]{9}" id="mobileno" placeholder="9001111111" className="form-control" validateTel="9001111111" maxlength="10" onChange={(event) => this.handleInputChange('contactno',event)} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="landmark">Landmark<span><b>*</b></span></label>
                            <input type="text" className="form-control" id="landmark" placeholder="1234 Main St" onChange={(event) => this.handleInputChange('landmark',event)}  required/>
                            <label htmlFor="inputAddress">Address<span><b>*</b></span></label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(event) => this.handleInputChange('address',event)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" onChange={(event) => this.handleInputChange('address2',event)} />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <label htmlFor="inputState">State<span><b>*</b></span></label>
                                <select id="inputState" className="form-control" style={{'height':'36px'}}  onChange={(event) => this.handleInputChange('states',event)} required>
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="inputCity">City<span><b>*</b></span></label>
                                <input type="text" className="form-control" id="inputCity" onChange={(event) => this.handleInputChange('city',event)} required/>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip<span><b>*</b></span></label>
                                <input type="text" className="form-control" id="inputZip" onChange={(event) => this.handleInputChange('zip',event)} required/>
                            </div>
                        </div>
                        <div style={{'fontWeight':'500', 'marginTop':'5px'}}> 
                                <span style={{'border-bottom':'2px solid red', 'color':'black'}}>Mode Of Payement</span>
                                <span>*</span>
                        </div>
                        <div className="row modeofPayment" >
                            <div className="col-6">
                                <input type="radio" id="payondelv" name="modeofpayment" value="1" onChange={(event) => this.handleInputChange('modeofpayment',event)} required />
                                <label htmlFor="payondelv">Pay on deleviry</label>
                            </div>
                            <div className="col-6">
                                <input type="radio" id="online" name="modeofpayment" value="2"  onChange={(event) => this.handleInputChange('modeofpayment',event)} />
                                <label htmlFor="online">Make Payment</label>
                            </div>
                        </div>

                        <div style={{'padding': '10px 25px 10px 25px', 'height': '32px'}}>
                            <input type="radio" id="back" name="paymentGrp" />
                            <label  htmlFor="back" className="back" onClick={() => this.handleBackPaymentModal('inputModal',true)}>Back</label>
                            <input type="radio" id="proceed" name="paymentGrp" />
                            <label htmlFor="proceed"  style={{'float': 'right'}}><button className="proceed">Proceed&gt;&gt;</button></label>
                        </div>
                    </form>
                    </div>
                </Modal>
            </div>
        )
    }
}