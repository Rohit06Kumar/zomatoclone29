import axios from "axios";
import React from "react";
import '../Style/home.css'
import QuickSearch from "./QuickSearch";
import Wallpaper from "./wallppaper";

export default class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }

    componentDidMount(){
        sessionStorage.clear();
        axios({
            method:'GET',
            url:'http://localhost:1234/locations',
            headers:{'content-type':'application/json'}
        })
            .then(response=>{
                this.setState({locations:response.data.locations})
            })
            .catch(err=> console.log(err))
        
        axios({
            method:'GET',
            url:'http://localhost:1234/mealtypes',
            headers:{'content-type':'application/json'}
        })
            .then(response=>{
                this.setState({mealtypes:response.data.mealtypes})
            })
            .catch(err=> console.log(err))    

           
    }
    
    render(){
        const{locations, mealtypes} = this.state;
        return(
            <div>
                
                <Wallpaper locationData = {locations} />
                <QuickSearch mealtypeData = {mealtypes} />
            </div>
        )
    }
}