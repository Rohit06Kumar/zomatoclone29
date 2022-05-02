import React from "react"
import QuickSearchItem from "./QuickSearchItem"

export default class QuickSearch extends React.Component{
    render(){
        const{ mealtypeData } = this.props;
        return(
            <div>
                <div className="container">
                    <div style={{'marginTop': '15px'}}>
                        <div style={{'fontSize': 'xx-large','fontFamily': 'sansSerif','color': 'blue'}}>Quick Searches</div>
                        <div style={{'fontFamily': 'cursive','fontSize': 'larger','color': 'gray'}}>Discover restaurants by type of meal</div>
                    </div>
                    <div className="row">
                        { mealtypeData.map(Item => {
                            return <QuickSearchItem qsData = {Item} />
                        }) }
                        
                    </div>
                </div>
            </div>
        )
    }
};