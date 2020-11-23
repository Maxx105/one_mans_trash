import axios from "axios"; 

const UserAPI = {
    getUser: function(id) {
        return axios.get("/api/user/user/" + id);
    }
}

export default UserAPI;