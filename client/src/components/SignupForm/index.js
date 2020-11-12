import React, {useState, useEffect} from "react";
import "./style.css";

function SignupForm(props) {
    const [alertColor, setAlertColor] = useState('');

    useEffect(() => {
        if (props.error) {
            setAlertColor("danger");
        } else {
            setAlertColor("success");
        }
    }, [props.message, props.error])

    return (
        <div className = "signup">
            <form onSubmit={props.onSubmit} >
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" id="first-name" name="first_name" onChange={props.onChange}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" id="last-name" name="last_name" onChange={props.onChange}/>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" id="user-name" name="username" onChange={props.onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={props.onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={props.onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
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

export default SignupForm;