import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ItemAPI from "../utils/ItemAPI";

function Home() {
    const [item, setItem] = useState({})

    const {id} = useParams()

    useEffect(() => {
        ItemAPI.getItem(id)
        .then(res => setItem(res.data))
        .catch(err => console.log(err.response));
    }, [])

    return (
        <div>
            <h1>{item.title}</h1>
            {item.photo ?
                <img src={item.photo} alt={item.title} className="img-fluid img-thumbnail" style={{height:'25%', width: '25%'}}/> :
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png" alt={item.title} className="img-fluid img-thumbnail" style={{height:'25%', width: '25%'}}/>
            }
            <p>{`details: ${item.details}`}</p>
            <p>{`condition: ${item.condition}`}</p>
            <p>{`user: ${item.user}`}</p>
            <p>{`value: $${item.value}`}</p>
            <p>{`zipcode: ${item.zipcode}`}</p>
        </div>
    );
}

export default Home;