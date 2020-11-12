import axios from "axios"; 

const ItemAPI = {
    getUserItems: function() {
        return axios.get("/api/userItems")
        .then(res => res.data)
        .catch(err => {
            if (err.response.status === 401) {
                return {message: "Not Signed In", error: true};
            }
        });   
    },
    getAllItems: function() {
        return axios.get("/api/allItems")
        .then(res => res.data)
        .catch(err => {
            if (err.response.status === 401) {
                return {message: "Not Signed In", error: true};
            }
        });   
    },
    postItem: function(item) {
        return axios.post("/api/allItems", item)
        .then(res => res.data)
        .catch(err => {
            if (err.response.status === 401) {
                return {message: "Not Signed In", error: true};
            }
        });
    }
}

export default ItemAPI;