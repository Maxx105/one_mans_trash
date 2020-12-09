import axios from "axios";

const ItemAPI = {
  getUserItems: function () {
    return axios
      .get("/api/user/userItems")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 401) {
          return { message: "Not Signed In", error: true };
        }
      });
  },
  getAllItems: function () {
    return axios
      .get("/api/user/allItems")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 401) {
          return { message: "Not Signed In", error: true };
        }
      });
  },
  getItem: function (id) {
    return axios.get("/api/user/allItems/" + id);
  },
  deleteItem: function (id) {
    return axios.delete("/api/user/allItems/" + id);
  },
  postItem: function (item) {
    return axios
      .post("/api/user/allItems", item)
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 401) {
          return { message: "Not Signed In", error: true };
        }
      });
  },
  uploadPhoto: function (data, config) {
    return axios
      .post("/api/user/upload", data, config)
      .then(
        (res) => res.data
      )
      .catch((err) => console.log(err.response));
  },
};

export default ItemAPI;
