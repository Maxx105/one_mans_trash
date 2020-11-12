import React from "react";
function HomeFeed(props) {
    return (
        <div className = "row">
            {
                props.items.map(item => (
                    <div className = "col-md-3 col-sm-12" key={item._id}>
                        <div className="card shadow" style={{width: "18rem", margin: "20px"}}>
                            <img src="https://freesvg.org/img/Placeholder.png" className="card-img-top" alt={item.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{`Description: ${item.details}`}</p>
                                <p className="card-text">{`Value: $${item.value}`}</p>
                                <p className="card-text">{`Condition: ${item.condition}`}</p>
                                <p className="card-text">{`User: ${item.user}`}</p>
                                <button className="btn btn-primary">Go somewhere</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default HomeFeed;