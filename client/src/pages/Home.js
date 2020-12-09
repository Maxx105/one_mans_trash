import React, { useState, useEffect, useContext } from "react";
import HomeFeed from "../components/HomeFeed";
import HomeFilterForm from "../components/HomeFilterForm";
import HomeSortForm from "../components/HomeSortForm";
import HomeZipFilterForm from "../components/HomeZipFilterForm";
import { AuthContext } from "../Context/AuthContext";
import ItemAPI from "../utils/ItemAPI";
import UserAPI from "../utils/UserAPI";
import ZipAPI from "../utils/ZipAPI";

function Home() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [placeholder, setPlaceholder] = useState("");
  const [visibility, setVisibility] = useState("hidden");
  const [filterString, setFilterString] = useState("");
  const [filterParam, setFilterParam] = useState("");
  const [sortString, setSortString] = useState("");
  const { id, setPhoto } = useContext(AuthContext);
  const [location, setLocation] = useState("");

  useEffect(() => {
    ItemAPI.getAllItems().then((data) => {
      setItems(data);
      setAllItems(data.slice(0));
    });
    if (id) {
      UserAPI.getUser(id._id).then((data) => {
        setPhoto(data.data.photo);
      });
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (sortString === "Price (Low to High)") {
      setItems(
        items.sort(function (a, b) {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortString === "Price (High to Low)") {
      setItems(
        items.sort(function (a, b) {
          if (a.value > b.value) {
            return -1;
          }
          if (a.value < b.value) {
            return 1;
          }
          return 0;
        })
      );
    } else if (sortString === "none") {
      setItems(allItems);
    }
  }, [sortString]);

  function handleFilterChange(event) {
    setFilterParam(event.target.value);
    setPlaceholder(`Enter ${event.target.value}`);
    if (event.target.value === "none") {
      setVisibility("hidden");
      setItems(allItems);
    } else {
      setVisibility("visible");
    }
  }

  function handleFilterInputChange(event) {
    setFilterString(event.target.value);
  }

  function handleFilterSubmit() {
    let filteredByItem = allItems.filter((item) => {
      if (item.title.toLowerCase().includes(filterString.toLowerCase())) {
        return item;
      }
    });
    let filteredByUsername = allItems.filter((item) => {
      if (item.user.toLowerCase().includes(filterString.toLowerCase())) {
        return item;
      }
    });
    if (filterParam === "Name of Item") {
      setItems(filteredByItem);
    } else if (filterParam === "Username") {
      setItems(filteredByUsername);
    }
    document.getElementById("filter").value = "";
  }

  function handleSortChange(event) {
    if (event.target.value === "Price (Low to High)") {
      setSortString(event.target.value);
      setItems(
        items.sort(function (a, b) {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        })
      );
    } else if (event.target.value === "Price (High to Low)") {
      setSortString(event.target.value);
      setItems(
        items.sort(function (a, b) {
          if (a.value > b.value) {
            return -1;
          }
          if (a.value < b.value) {
            return 1;
          }
          return 0;
        })
      );
    } else if (event.target.value === "none") {
      setItems(allItems);
    }
  }

  function handleLocationInputChange(e) {
    setLocation(e.target.value);
  }

  function handleDistanceInputChange(e) {
    let distanceArray = [];
    if (e.target.value !== "none") {
      ZipAPI.getZipCodesByRadius(location, e.target.value).then((data) => {
        data.data.zip_codes.forEach((zip_code) => {
          allItems.forEach((item) => {
            if (item.zipcode === parseInt(zip_code.zip_code)) {
              distanceArray.push(item);
            }
          });
        });
        setItems(distanceArray);
      });
    } else {
      setItems(allItems);
      document.getElementById("distance-filter").value = "";
    }
  }
  function handleUseMyLocationSubmit(e) {
    ZipAPI.getMyIP()
    .then(data => {
      const { ip } = data.data;
      ZipAPI.getZipbyLocation(ip).then((data) => {
        const { city, region_code, country_code, zip_code } = data.data;
        const location = `${city}, ${region_code}, ${country_code} ${zip_code}`;
        document.getElementById("distance-filter").value = location;
        setLocation(zip_code);
      });
    })
    
  }
  return (
    <div>
      <div className="container">
        <HomeFilterForm
          visibility={visibility}
          placeholder={placeholder}
          onSelectChange={handleFilterChange}
          onClick={handleFilterSubmit}
          onInputChange={handleFilterInputChange}
        ></HomeFilterForm>
        <HomeSortForm onSortChange={handleSortChange}></HomeSortForm>
        <HomeZipFilterForm
          onUseMyLocationClick={handleUseMyLocationSubmit}
          onLocationChange={handleLocationInputChange}
          onDistanceChange={handleDistanceInputChange}
        ></HomeZipFilterForm>
      </div>
      <HomeFeed items={items}></HomeFeed>
    </div>
  );
}

export default Home;
