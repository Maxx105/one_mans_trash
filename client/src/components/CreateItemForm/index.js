import React, { useState, useEffect } from "react";
import "./style.css";
function CreateItemForm(props) {
  const [alertColor, setAlertColor] = useState("");

  useEffect(() => {
    if (props.error) {
      setAlertColor("danger");
    } else {
      setAlertColor("success");
    }
  }, [props.message, props.error]);

  return (
    <div>
      <div id="formCard">
        <h1 className="signupTitle" id="title">CREATE AN ITEM</h1>
        <h3>Title:</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          name="title"
          onChange={props.onChange}
        />
        <h3>Details:</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Details"
          name="details"
          onChange={props.onChange}
        />
        {/* <h3>Photo:</h3>
            <input className="form-control" type="text" placeholder="Default input" name="photo" onChange={props.onChange}/> */}
        <div className="form-group">
          <h3>
            <label htmlFor="file">Photo:</label>
          </h3>
          <input
            type="file"
            className="form-control-file"
            id="file"
            onChange={props.imageChange}
          />
        </div>
        <h3>Value:</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Price"
          name="value"
          onChange={props.onChange}
        />
        <h3>Condition:</h3>
        <select
          className="form-control"
          name="condition"
          id="itemCondition"
          onChange={props.onChange}
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Slight wear">Slight wear</option>
          <option value="Used">Used</option>
        </select>
        <h3>Zipcode:</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Item Location"
          name="zipcode"
          onChange={props.onChange}
        />
        <button
          id="createItemBtn"
          onClick={props.onClick}
          className="btn btn-primary"
        >
          Post it!
        </button>
        <br />
        <br />
        {props.message ? (
          <div className={`alert alert-${alertColor}`} role="alert">
            {props.message}{" "}
            <div className="d-flex align-items-center">
              <strong>Loading...</strong>
              <div
                className="spinner-border ml-auto"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default CreateItemForm;
