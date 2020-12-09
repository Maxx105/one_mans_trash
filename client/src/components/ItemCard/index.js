import React from "react";
import "./style.css";
import ItemAPI from "../../utils/ItemAPI";
import { Link } from "react-router-dom";

function ItemCard(props) {
  function deleteItem(id) {
    ItemAPI.deleteItem(id)
      .then((res) => props.loadItems())
      .catch((err) => console.log(err.response));
  }

  return (
    <div>
      <hr />
      <div className="row">
        {props.items.map((item) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={item._id}>
            <div className="card card-hover" style={{ margin: "10px" }}>
              <Link to={"/item/" + item._id} id="item-card-link">
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
                  <div className="card-body">
                    <h5 className="title">{item.title}</h5>
                    <p className="category-text">
                      <span style={{ fontWeight: "bolder" }}>
                        {" "}
                        {"Details:"}{" "}
                      </span>{" "}
                      {item.details}{" "}
                    </p>
                    <p className="category-text">
                      <span style={{ fontWeight: "bolder" }}> {"Value:"}</span>{" "}
                      {`$${item.value}`}
                    </p>
                    <p className="category-text">
                      <span style={{ fontWeight: "bolder" }}>
                        {" "}
                        {"Condition:"}
                      </span>
                      {item.condition}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="btn btn-danger delete"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ItemCard;