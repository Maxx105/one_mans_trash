import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function HomeFeed(props) {
    const URL = "/uploads/";
    return (
        <div className = "row">
            {
                props.items.map(item => (
                    <div className = "col-md-3 col-sm-6 col-xs-12" key={item._id}>
                        <Link to={"/item/" + item._id}  id="home-item-card-link">
                            <div className="card shadow" style={{margin: "10px"}}>
                                {item.photo ?
                                    <img src={URL + item.photo} className="card-img-top img-thumbnail" alt={item.title}/> :
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" className="card-img-top" alt={item.title}/>
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{`Description: ${item.details}`}</p>
                                    <p className="card-text">{`Value: $${item.value}`}</p>
                                    <p className="card-text">{`Condition: ${item.condition}`}</p>
                                    <p className="card-text">{`User: ${item.user}`}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}
export default HomeFeed;