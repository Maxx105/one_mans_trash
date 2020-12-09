import axios from "axios";

const MessageAPI = {
  getAllMessages: function () {
    return axios
      .get("/api/user/messages")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getAllConversations: function () {
    return axios
      .get("/api/user/conversation")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getUserMessages: function () {
    return axios.get("/api/user/userMessages")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  },
  getUserConversations: function () {
    return axios.get("/api/user/userConversation")
    .then((res) => res.data)
    .catch((err) => console.log(err));
  },
  postMessage: function (messages) {
    return axios
      .post("/api/user/messages", messages)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  postInitialMessage: function(message) {
    return axios 
      .post("/api/user/conversation", message)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  postToConversation: function(id, message) {
    return axios 
      .post("/api/user/conversation/" + id, message)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
  getConversation: function(id) {
    return axios
      .get("/api/user/conversation/" + id)
      .then(res => res.data)
      .catch(err => console.log(err))
  },
  updateConversation: function(message) {
    return axios
      .put("/api/user/conversation", message)
      .then(res => res.data)
      .catch(err => console.log(err.response))
  },
  updateUserWithConversation: function(id, conversation) {
    return axios
      .put("/api/user/user/" + id, conversation)
      .then(res => res.data)
      .catch(err => console.log(err.response))
  }
};

export default MessageAPI;
