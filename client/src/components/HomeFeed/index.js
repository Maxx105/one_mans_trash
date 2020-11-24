import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function HomeFeed(props) {
  return (
    <div className="row">
      {props.items.map((item) => (
        <div className="col-lg-3 col-md-6 col-sm-12" key={item._id}>
          <Link to={"/item/" + item._id} id="home-item-card-link">
            <div className="card shadow" style={{ margin: "10px" }}>
              <div className="photo">
                {item.photo ? (
                  <img
                    src={item.photo}
                    className="card-img-top img-thumbnail"
                    alt={item.title}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                    className="card-img-top"
                    alt={item.title}
                  />
                )}
              </div>
              <div className="card-body">
                <h5 className="title">{item.title}</h5>
                {/* <p className="category-text">{'Details:'} </p><p className="body-text">{item.details}</p>
                            <p className="category-text">{'Condition:'}</p><p className="body-text">{item.condition}</p> 
                            <p className="category-text">{'User:'}</p><p className="body-text"> {item.user}</p> */}
                <p className="category-text">
                  <span style={{ fontWeight: "bolder" }}> {"Value: "}</span>{" "}
                  {`$${item.value}`}
                </p>
                <p className="category-text">
                  {" "}
                  <span style={{ fontWeight: "bolder" }}>
                    {" "}
                    {"Zipcode:"}
                  </span>{" "}
                  {item.zipcode}{" "}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default HomeFeed;
