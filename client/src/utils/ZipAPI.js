import axios from "axios";
const API_KEY =
  "e2wXC2AwQmTyIBIYRs4g1enr5Rs6E8KSQuLYTWMxmkAIjUfVEIeCPeAlJg5aGul6";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const ZipAPI = {
  getZipCodesByRadius: function (zipcode, distance) {
    return axios({
      mode: "no-cors",
      method: "get",
      url:
        proxyurl +
        `https://www.zipcodeapi.com/rest/${API_KEY}/radius.json/${zipcode}/${distance}/miles`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  },
  getZipbyLocation: function () {
    return axios.get("https://freegeoip.app/json/");
  },
};
export default ZipAPI;
