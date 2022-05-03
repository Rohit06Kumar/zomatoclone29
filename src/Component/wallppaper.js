import react from 'react'
import axios from "axios";
import { withRouter } from 'react-router-dom';

export default withRouter(class Wallpaper extends react.Component{
    constructor(){
        super();
        this.state ={
            restaurants: [],
            inputText: undefined,
            Suggestions: []
        }
    }

    handleDDChange = (event) =>{
        const locationId = event.target.value;
        sessionStorage.setItem('locationId',locationId);
        axios({
            method:'GET',
            url:`http://localhost:1234/restaurants/${locationId}`,
            headers:{'content-type':'application/json'},
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants})
            })
            .catch(err=> console.log(err))
    }

    handleSearch = (event) => {
        let inputText = event.target.value;

        let {restaurants} = this.state;

        let Suggestions = restaurants.filter(Item => Item.name.toLowerCase().includes(inputText.toLowerCase()));

        this.setState({inputText, Suggestions});
    }

    handleShowSuggestions = () =>{
        const {Suggestions, inputText} = this.state;
        
        if (Suggestions.length === 0 && inputText === undefined){
            return null;
        }
        if (Suggestions.length > 0 && inputText === ''){
            return null;
        }

        if (Suggestions.length === 0 && inputText){
            return  <ul>
                        <li>No Result Found</li>
                    </ul>
        }
        return(
            <ul>
                {
                    Suggestions.map((Item, Index) => (<li key={Index} onClick={() => this.selectigRestaurants(Item)} >{`${Item.name} - ${Item.locality},${Item.city}`} </li>))
                }
            </ul>
        );

    }


    selectigRestaurants = (resObj) =>{
        this.props.history.push(`/details?restaurant=${resObj._id}`)
    }

    render(){
        const{locationData} = this.props;
        return(
                <div className="home">
                    <div className="flex_box">
                        <div className="logo">
                            <div>e!</div>
                        </div>
                        <div className="logo_subheading">Find the best restaurants, cafes and bars</div>
                        <div className="search_select" style={{'display': 'flex','flexWrap': 'wrap','flexDirection': 'row'}}>
                            <div className="select">
                                <select name="" id="" style={{'cursor': 'pointer', 'outline': 'none'}} onChange={this.handleDDChange}>
                                    <option value="" style={{'display': 'none'}}>Select Area</option>
                                    {locationData.map(item => {
                                        return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                                    }) }
                                </select>
                            </div>
                            <div className="search">
                                <input className='inputHome' type="search" placeholder="search for best restaurants" onChange={this.handleSearch} />
                                <i className="bi bi-search"></i>
                                {this.handleShowSuggestions()}
                            </div>
                        </div>
                    </div>
                    {/* <!-- <img src=" ./Asset/homepageimg.png " alt="no image " width="100% " height="400px"> --> */}
                </div>
        )
    }
})