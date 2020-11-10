import React from "react";
import {Link} from "react-router-dom";

function LoginForm(props) {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="username" onChange={props.onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={props.onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br/>
            {props.message ? 
                <div className="alert alert-danger" role="alert">
                    {props.message}
                </div> :
            null}
            <Link className="nav-link" to="/signup">Don't have an account? Sign up here.</Link>
        </div>
    );
}

export default LoginForm;