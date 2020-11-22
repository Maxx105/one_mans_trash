import React from "react";
import "./style.css";
function HomeZipFilterForm(props) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="distance">Filter by Distance:</label>
                <div className = "row">
                    <div className = "col-md-6 col-sm-12">
                        <div className="input-group mb-3">
                            <input
                                className="form-control shadow bg-light"
                                id="distance-filter"
                                type="text"
                                placeholder="Enter Your Zip Code"
                                onChange = {props.onLocationChange}
                            ></input>
                        </div>
                    </div>
                    <div className = "col-md-6 col-sm-12">
                        <select className="form-control shadow bg-light" id="distance" placeholder="Sort By" onChange={props.onDistanceChange}>
                            <option value="none"> Select Distance </option>
                            <option value="15">15 mi</option>
                            <option value="25">25 mi</option>
                            <option value="40">40 mi</option>
                            <option value="60">60 mi</option>
                            <option value="80">80 mi</option>
                            <option value="100">100 mi</option>
                            <option value="150">150 mi</option>
                            <option value="200">200 mi</option>
                            <option value="500">500 mi</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomeZipFilterForm;