import React, { useState, useEffect } from "react";
function CreateItemForm(props) {
    const [alertColor, setAlertColor] = useState('');

    useEffect(() => {
        if (props.error) {
            setAlertColor("danger");
        } else {
            setAlertColor("success");
        }
    }, [props.message, props.error])

    return (
        <div>
            <h3>Title:</h3>
            <input className="form-control" type="text" placeholder="Default input" name="title" onChange={props.onChange}/>
            <h3>Details:</h3>
            <input className="form-control" type="text" placeholder="Default input" name="details" onChange={props.onChange}/>
            {/* <h3>Photo:</h3>
            <input className="form-control" type="text" placeholder="Default input" name="photo" onChange={props.onChange}/> */}
            <div className="form-group">
                <h3><label htmlFor="file">Photo:</label></h3>
                <input type="file" className="form-control-file" id="file" onChange={props.imageChange}/>
            </div>
            <h3>Value:</h3>
            <input className="form-control" type="text" placeholder="Default input" name="value" onChange={props.onChange}/>
            <h3>Condition:</h3>
            <select className="form-control" name="condition" id="itemCondition" onChange={props.onChange}>
                <option value="">Select your option</option>
                <option value="For Parts">For Parts</option>
                <option value="Slight Use">Slight Use</option>
                <option value="Dead Stock">Dead Stock</option>
            </select>
            <h3>Zipcode:</h3>
            <input className="form-control" type="text" placeholder="Default input" name="zipcode" onChange={props.onChange}/>
            <button onClick = {props.onClick} className="btn btn-primary">Submit</button>
            <br/>
            <br/>
            {props.message  ? 
            <div className={`alert alert-${alertColor}`} role="alert">
                {props.message} {' '}
                <div className="d-flex align-items-center">
                    <strong>Loading...</strong>
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
            </div> :
            null
            }
        </div>
    );
}
export default CreateItemForm;