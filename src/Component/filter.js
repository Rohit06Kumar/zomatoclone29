import React from "react";
import '../Style/filter.css'
import queryString from 'query-string'
import axios from "axios";

export default class Filter extends React.Component{

    constructor(){
        super();
        this.state={
            mealtypeName : undefined,
            restaurants: [],
            locations:[],
            pagecount:[],
            mealtype:undefined,
            cuisine:[],
            location:undefined,
            lcost:undefined,
            hcost:undefined,
            sort:1,
            page:1
        }
    }

    componentDidMount(){
        const qs = queryString.parse(this.props.location.search);
        const { mealtype,location,name } = qs;
        this.setState({mealtypeName:name})
        const filterObj={
            mealtype:Number(mealtype),
            location:Number(location)
        }

        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants, 
                pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err))

        axios({
            method:'GET',
            url:'https://nameless-chamber-61301.herokuapp.com/locations',
            headers:{'content-type':'application/json'}
        })
            .then(response=>{
                this.setState({locations:response.data.locations, mealtype, location})
            })
            .catch(err=> console.log(err))
    }

    handleSortChange = (sort) =>{

        const{mealtype,cuisine,location,lcost,hcost,page,locations} = this.state;
        // if (cuisine==[]){
        //     this.setState({cuisine:undefined})
        // }
        const filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            page,
            sort
        }

        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,sort, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err))
    }

    handleCostChange = (lcost, hcost) =>{
        const{mealtype,cuisine,location,sort} = this.state;
        // if (cuisine==[]){
        //     this.setState({cuisine:undefined})
        // }
        const filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            sort
        }

        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,lcost, hcost, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err))

    }

    handleLocationChange = (event) =>{
        const location = Number(event.target.value);
        const{mealtype,cuisine,lcost, hcost,sort} = this.state;
        // if (cuisine==[]){
        //     this.setState({cuisine:undefined})
        // }
        const filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            sort
        }

        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,location, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err))
        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}`);    
    }

    handleCuisineChange = () =>{
        let{cuisine,mealtype,lcost,location, hcost,sort} = this.state;
        var checked1 = document.getElementById("1").checked;
        var checked2 = document.getElementById("2").checked;
        var checked3 = document.getElementById("3").checked;
        var checked4 = document.getElementById("4").checked;
        var checked5 = document.getElementById("5").checked;
        if (checked1){
            var cuisine1 = 1
            if (cuisine.includes(cuisine1) === false) cuisine.push(cuisine1);
        }
        else {
            var cuisine1 = 1
            if (cuisine.includes(cuisine1) === true) cuisine.splice(cuisine.indexOf(cuisine1), 1);
        }

        if (checked2){
            var cuisine2 = 2
            if (cuisine.includes(cuisine2) === false) cuisine.push(cuisine2);
        }
        else {
            var cuisine2 = 2
            if (cuisine.includes(cuisine2) === true) cuisine.splice(cuisine.indexOf(cuisine2), 1);
        }

        if (checked3){
            var cuisine3 = 3
            if (cuisine.includes(cuisine3) === false) cuisine.push(cuisine3);
            // cuisine.push(cuisine3)
        }
        else {
            var cuisine3 = 3
            if (cuisine.includes(cuisine3) === true) cuisine.splice(cuisine.indexOf(cuisine3), 1);
            // cuisine.pop([3])
        }

        if (checked4){
            var cuisine4 = 4
            if (cuisine.includes(cuisine4) === false) cuisine.push(cuisine4);
            // cuisine.push(cuisine4)
        }
        else {
            var cuisine4 = 4
            if (cuisine.includes(cuisine4) === true) cuisine.splice(cuisine.indexOf(cuisine4), 1);
            // cuisine.pop([4])
        }

        if (checked5){
            var cuisine5 = 5
            if (cuisine.includes(cuisine5) === false) cuisine.push(cuisine5);
            // cuisine.push(cuisine5)
        }
        else {
            var cuisine5 = 5
            if (cuisine.includes(cuisine5) === true) cuisine.splice(cuisine.indexOf(cuisine5), 1);
            // cuisine.pop([5])
        }
        let filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            sort
        }
        

        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,cuisine, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err))
    }


    handlePageChange = (page) =>{
        let i = 1
        const{mealtype,cuisine,location,lcost,hcost,sort,pagecount} = this.state;

        while (i <= document.querySelectorAll("div a").length-2){
            document.getElementById("item"+i).className = "activenot";
            if (i !=1){
                document.getElementById("item1").style.background = "white";
            }
            i += 1
        }
        if (page==1){
            document.getElementById("item1").style.background = "red";
        }
        if (page==pagecount){
            document.getElementById("next").style.background = "yellow";
        }else{
            document.getElementById("next").style.background = "white";
        }
        if (page==1){
            document.getElementById("prev").style.background = "yellow";
        }else{
            document.getElementById("prev").style.background = "white";
        }

        document.getElementById("item"+page).className = "active";
        const filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            page,
            sort
        }
        
        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,page, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err))
    }

    handlePrev = () =>{
       let i = 1
       let{mealtype,cuisine,location,lcost,hcost,sort,page,pagecount} = this.state;
        // if (cuisine==[]){
        //     this.setState({cuisine:undefined})
        // }
        if (page>1){
            page -= 1
        }
        if(page==1){
            document.getElementById("prev").style.background = "yellow";
        }
        else{
            document.getElementById("prev").style.background = "white";
        }
        if(page==pagecount){
            document.getElementById("next").style.background = "yellow";
        }else{
            document.getElementById("next").style.background = "white";
        }

        while (i <= document.querySelectorAll("div a").length-2){
            document.getElementById("item"+i).className = "activenot";
            if (i !=1){
                document.getElementById("item1").style.background = "white";
            }
            i += 1
        }
        if (page==1){
            document.getElementById("item1").style.background = "red";
        }

        document.getElementById("item"+page).className = "active";
        const filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            page,
            sort
        }
        
        // alert(page)
        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,page, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err)) 
    }    

    handleNext = () =>{
       let i = 1
       let{mealtype,cuisine,location,lcost,hcost,sort,page,pagecount} = this.state;
        // if (cuisine==[]){
        //     this.setState({cuisine:undefined})
        // }
        if (page != pagecount){
            // alert('rohit')
            page += 1
        }
        if(page == pagecount){
            document.getElementById("next").style.background = "yellow";
        }
        else{
            document.getElementById("next").style.background = "white";
        }
        if(page != pagecount || page>1){
            document.getElementById("prev").style.background = "white";
        }

        while (i <= document.querySelectorAll("div a").length-2){
            document.getElementById("item"+i).className = "activenot";
            if (i !=1){
                document.getElementById("item1").style.background = "white";
            }
            i += 1
        }
        if (page==1){
            document.getElementById("item1").style.background = "red";
        }

        document.getElementById("item"+page).className = "active";
        // alert(page)
        const filterObj = {
            mealtype:Number(mealtype),
            cuisine,
            location:Number(location),
            lcost,
            hcost,
            page,
            sort
        }
        // alert(page + '    ' + pagecount)
        
        axios({
            method:'POST',
            url:'https://nameless-chamber-61301.herokuapp.com/filter',
            headers:{'content-type':'application/json'},
            data:filterObj
        })
            .then(response=>{
                this.setState({restaurants:response.data.restaurants,page, 
                    pagecount:response.data.pageCount})
            })
            .catch(err=> console.log(err)) 
    }

    handleNavigate = (resId) =>{
        this.props.history.push(`/details?restaurant=${resId}`)
    }


    render(){
        let{restaurants, locations, pagecount,mealtypeName}=this.state;
        let rows = []
        for(let i = 1; i <= pagecount; i++){
            rows.push(i)
        }
        return(
            <div>
                <div className="container" style={{'margin-top': '2%'}}>
                    <h1 style={{'color': 'darkBlue', 'margin-bottom': '2.5%', 'font-weight': 'bold', 'font-family': 'fantasy'}}>{mealtypeName}</h1> 
                </div>
                <div className="container" style={{'margin-top': '2%'}}>
                    <div className="row" style={{'height': '100%'}}>
                        <div className="col-lg-4 col-sm-12 col-md-4">
                            <div className="filter">
                                <div className="filter_cont ">
                                    Filters<span className="icon-sort-down icon" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" style={{'cursor': 'pointer'}}></span>
                                </div>
                                <div className="collapse show " id="collapseExample">
                                    <div style={{'line-height': '3'}}>
                                        <div style={{'color': 'darkBlue'}}>Select Location</div>
                                        <select name="" id="" style={{'width': '180px', 'height': '33px', 'cursor':'pointer'}} onChange={this.handleLocationChange}>
                                            <option value="" hidden> select location</option>
                                            {locations.map(item => {
                                                return <option value={item.location_id}>{`${item.name},${item.city}`}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="filtercuisine">
                                        <div style={{'margin': '15px 0px 15px 0px', 'font-size': '20px', 'color': 'darkBlue'}}>Cuisines</div>
                                        <label for=""><input type="checkbox" id="1" onClick={() => this.handleCuisineChange()} /> North Indian</label><br/>
                                        <label for=""><input type="checkbox" id="2" onClick={() => this.handleCuisineChange()} /> South Indian</label><br/>
                                        <label for=""><input type="checkbox" id="3" onClick={() => this.handleCuisineChange()} /> Chinese</label><br/>
                                        <label for=""><input type="checkbox" id="4" onClick={() => this.handleCuisineChange()} /> Fast Food</label><br/>
                                        <label for=""><input type="checkbox" id="5" onClick={() => this.handleCuisineChange()} /> Street Food</label><br/>
                                    </div>
                                    <div className="costfilter">
                                        <div style={{'font-size': '20px', 'margin': '20px 0px 20px 0px', 'color': 'darkBlue'}}>Cost For Two</div>
                                        <label for=""><input type="radio" name="rate" onClick={() => this.handleCostChange(1, 500)}/>  Less than &#8377; 500</label><br/>
                                        <label for=""><input type="radio" name="rate" onClick={() => this.handleCostChange(500, 1000)}/>  &#8377; 500 to &#8377; 1000</label><br/>
                                        <label for=""><input type="radio" name="rate" onClick={() => this.handleCostChange(1000, 1500)}/>  &#8377; 1000 to &#8377; 1500</label><br/>
                                        <label for=""><input type="radio" name="rate" onClick={() => this.handleCostChange(1500, 2000)}/>  &#8377; 1500 to &#8377; 2000</label><br/>
                                        <label for=""><input type="radio" name="rate" onClick={() => this.handleCostChange(2000, 200000)}/>  &#8377; 2000+</label><br/>
                                    </div>
                                    <div className="filtersort">
                                        <div style={{'font-size': '20px', 'margin': '20px 0px 20px 0px', 'color': 'darkBlue', 'font-weight': 'bold'}}>Sort</div>
                                        <label for=""><input type="radio" name="itmrate" onChange={() =>this.handleSortChange(1)}/>  Price low to high</label><br/>
                                        <label for=""><input type="radio" name="itmrate" onChange={() =>this.handleSortChange(-1)}/>  Price high to low</label><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-sm-12 col-md-8">
                            <div>
                                {restaurants.length > 0? restaurants.map(Item => {
                                    return <div className="filteritem" onClick={() => this.handleNavigate(Item._id)}>
                                                <div className="row  upperItem">
                                                    <div className="col-4">
                                                        <img className="imgclass" src={`./${Item.image}`} alt="no image found" width="80%"/>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className="img_right_heading">{Item.name}</div>
                                                        <div className="fort">{Item.locality}</div>
                                                        <diV style={{'color': 'darkgray', 'margin-left': '7px'}}>{Item.city}</diV>
                                                    </div>
                                                </div>
                                                <div className="row lowerItem">
                                                    <div className="col-12">
                                                        <div>
                                                            <div className="div1">CUISINES</div>
                                                            <div style={{'display':'inline-block'}} >{Item.cuisine.map(cuisine => `${cuisine.name}`)}</div>
                                                        </div>
                                                        <div>
                                                            <div className="div1">COST FOR TWO</div>
                                                            <div style={{'display':'inline-block'}} >{Item.min_price}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                }): <div style={{'font-size': '40px','font-family': 'cursive,tahoma','color': 'red'}}>
                                        no result found...</div>}
                                {pagecount >= 1? 
                                    <div className="pagination" >
                                        <a onClick={() => this.handlePrev()} id="prev" style={{'width': '55px','background':'yellow'}}>&laquo; Prev</a>
                                        {rows.map(Item => {
                                            return <a id={'item'+Item} className="b" onClick={() => this.handlePageChange(Item)}>{Item}</a>
                                        })}
                                        {rows.map(Item =>{
                                            if(rows.length==1 & Item==pagecount){
                                                return <a onClick={() => this.handleNext()} id="next" style={{'width': '55px','background':'yellow'}}>Next  &raquo;</a>
                                            }
                                            if(rows.length>=1 & Item==1){
                                                return <a onClick={() => this.handleNext()} id="next" style={{'width': '55px'}}>Next  &raquo;</a>
                                            }
                                        })}
                                    </div> : null }        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}