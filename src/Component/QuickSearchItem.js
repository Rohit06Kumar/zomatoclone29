import React from "react";
import { withRouter } from "react-router-dom";

class QuickSearchItem extends React.Component{
    handleNavigate = (mealTypeId,name) => {
        const locationId = sessionStorage.getItem('locationId');
        if(locationId){
            this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${locationId}&name=${name}`);
        }
        else{
            this.props.history.push(`/filter?mealtype=${mealTypeId}&name=${name}`);
        }
    }
    render(){
        const{qsData} = this.props
        return(
            <div className="col-lg-4 col-sm-12 col-md-6" onClick={() => this.handleNavigate(qsData.meal_type,qsData.name)}>
                <div className="item">
                    <div className="row">
                        <div className="col-6" style={{'width': '50%'}}>
                            <img src={`./${qsData.image}`} alt="no image" width="100%" height="158px"/>
                        </div>
                        <div className="col-6">
                            <div className="item_heading"> {qsData.name}</div>
                            <div className="item_subheading">{qsData.content}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(QuickSearchItem);