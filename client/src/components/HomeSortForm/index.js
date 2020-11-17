import React from "react";
import "./style.css";
function HomeSortForm(props) {
    return (
        <div className="form-group">
            <label htmlFor="sel1">Sort By:</label>
            <select className="form-control shadow bg-light" id="sel2" placeholder="Sort By" onChange={props.onSortChange}>
                <option value="none"> Select an Option </option> 
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
            </select>
        </div>
    );
}
export default HomeSortForm;