import React from "react";
import '../Style/final.css'

export default class final extends React.Component{
    handleHome = () =>{
        this.props.history.push('/')
    }

    render(){
        return (
            <div style={{'margin': '20%'}}>
                <div className="ordercnfd">Your Order Confirmed</div>
                <button onClick={() => this.handleHome()} className="orderbtn">Go To Home</button>
            </div>
        )
    }
}