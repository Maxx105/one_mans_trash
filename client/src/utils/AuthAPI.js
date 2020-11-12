import axios from "axios"; 

const AuthAPI = {
    login: function(user) {
        return axios.post("/api/login", user)
        .then(res => res.data)
        .catch(err => {
            if (err.response.status >= 400) {
                return { isAuthenticated: false, user: {username: ""}, message: "Incorrect username or password"};
            }
        });
    },
    register: function(user) {
        return axios.post("/api/register", user)
        .then(res => res.data)
    },
    logout: function() {
        return axios.get("/api/logout")
        .then(res => res.data)
    },
    isAuthenticated: function() {
        return axios.get("/api/authenticated")
        .then(res => res.data)
        .catch(err => {
            if (err.response.status >= 400) {
                return { isAuthenticated: false, user: {username: ""}};
            }
        });    
    }
}

export default AuthAPI;