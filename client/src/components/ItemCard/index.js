import React from "react";
import "./style.css";
import ItemAPI from "../../utils/ItemAPI";
import { Link } from "react-router-dom";

function ItemCard(props) {

    function deleteItem(id) {
        ItemAPI.deleteItem(id)
          .then(res => props.loadItems())
          .catch(err => console.log(err.response));
    }

    const URL = "/uploads/";

    return (
        <div>
        <hr/>
        <div className = "row">
            {
                props.items.map(item => (
                    <div className = "col-md-3 col-sm-6 col-xs-12" key={item._id}>
                        <div className="card shadow" style={{margin: "20px"}}>
                            <Link to={"/item/" + item._id} id="item-card-link">
                                <div>
                                    {item.photo ?
                                        <img src={URL + item.photo} className="card-img-top" alt={item.title}/> :
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" className="card-img-top" alt={item.title}/>
                                    }
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{`Description: ${item.details}`}</p>
                                        <p className="card-text">{`Value: $${item.value}`}</p>
                                        <p className="card-text">{`Condition: ${item.condition}`}</p>
                                    </div>
                                </div>
                            </Link>
                            <button className = "btn btn-danger" onClick={() => deleteItem(item._id)}>Delete</button>
                        </div>
                        
                    </div>
                ))
            }
        </div>
        </div>
    );
}
export default ItemCard;