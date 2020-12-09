import React from "react";
// import "./style.css";

function MessageResponseForm(props) {
  return (
    <div>
        <form>
            <div className="form-group" style={{margin: "10px"}}>
                <div className="input-group mb-3">
                    <input
                        className="form-control shadow bg-light"
                        id="response-input"
                        type="text"
                        placeholder="Enter Your Message"
                        onChange={props.onResponseInputChange}
                    ></input>
                    <div className="input-group-append">
                        <button
                        onClick={props.sendResponse}
                        className="btn btn-primary btn-block shadow"
                        >
                        Send
                        </button>
                    </div>
                </div>
            </div>
        </form>
        {/* {props.message ? (
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
      ) : null} */}
    </div>
  );
}
export default MessageResponseForm;