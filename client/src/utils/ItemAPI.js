import axios from "axios"; 

const ItemAPI = {
    getItems: function() {
        return axios.get("/user/items")
        .then(res => res.data)
        .catch(err => {
            if (err.response.status === 401) {
                return {message: "Not Signed In", error: true};
            }
        });   
    },
    postItem: function(item) {
        return axios.post("/user/item", item)
        .then(res => res.data)
        .catch(err => {
            if (err.response.status === 401) {
                return {message: "Not Signed In", error: true};
            }
        });
    }
}

export default ItemAPI;