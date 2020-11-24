import React from "react";
import "./style.css";
function HomeFilterForm(props) {
  return (
    <div className="form-group">
      <label htmlFor="sel1">Filter By:</label>
      <select
        className="form-control shadow bg-light"
        id="sel1"
        placeholder="Sort By"
        onChange={props.onSelectChange}
      >
        <option value="none"> Select an Option </option>
        <option value="Name of Item">Name of Item</option>
        <option value="Username">Username</option>
      </select>
      <div className="input-group mb-3">
        <input
          className="form-control shadow bg-light"
          id="filter"
          type="text"
          placeholder={props.placeholder}
          onChange={props.onInputChange}
          style={{ visibility: props.visibility }}
        ></input>
        <div className="input-group-append">
          <button
            type="submit"
            className="btn shadow btn-primary"
            style={{ visibility: props.visibility }}
            onClick={props.onClick}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomeFilterForm;
