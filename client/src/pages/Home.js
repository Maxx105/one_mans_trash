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
    const [placeholder, setPlaceholder] = useState('');
    const [visibility, setVisibility] = useState('hidden');
    const [filterString, setFilterString] = useState('');
    const [filterParam, setFilterParam] = useState('');
    const [sortString, setSortString] = useState('');
    const {id, setId, photo, setPhoto} = useContext(AuthContext);
    const [location, setLocation] = useState("");
    const [distance, setDistance] = useState("");

    useEffect(() => {
        ItemAPI.getAllItems().then(data => {
            setItems(data)
            setAllItems(data.slice(0))
        });
        if (id) {
            UserAPI.getUser(id._id).then(data => {
                setPhoto(data.data.photo)
            })
        } else {
            return
        }
    }, []);

    useEffect(() => {
        if (sortString === "Price (Low to High)") {
            setItems(
                items.sort(function(a, b) {
                    if (a.value < b.value) { return -1; }
                    if (a.value > b.value) { return 1; }
                    return 0;
                })
            )
        } else if (sortString === "Price (High to Low)") {
            setItems(
                items.sort(function(a, b) {
                    if (a.value > b.value) { return -1; }
                    if (a.value < b.value) { return 1; }
                    return 0;
                })
            )
        } else if (sortString === "none") {
            setItems(allItems)
        } 
    }, [sortString]);

    function handleFilterChange(event) {
        setFilterParam(event.target.value);
        setPlaceholder(`Enter ${event.target.value}`)
        if (event.target.value === 'none') {
            setVisibility('hidden')
            setItems(allItems)
        } else {
            setVisibility('visible')
        }
    }

    function handleFilterInputChange(event) {
        setFilterString(event.target.value);
    }

    function handleFilterSubmit() {
        let filteredByItem = allItems.filter(item => {
            if (item.title.toLowerCase().includes(filterString.toLowerCase())) {
                return item;
            }
        });
        let filteredByUsername = allItems.filter(item => {
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
            setSortString(event.target.value)
            setItems(
                items.sort(function(a, b) {
                    if (a.value < b.value) { return -1; }
                    if (a.value > b.value) { return 1; }
                    return 0;
                })
            )
        } else if (event.target.value === "Price (High to Low)") {
            setSortString(event.target.value)
            setItems(
                items.sort(function(a, b) {
                    if (a.value > b.value) { return -1; }
                    if (a.value < b.value) { return 1; }
                    return 0;
                })
            )
        } else if (event.target.value === "none") {
            setItems(allItems)
        }
    }

    function handleLocationInputChange(e) {
        setLocation(e.target.value)
    }
    // const zipcodeData = [
    //         {
    //             zip_code: "92659",
    //             distance: 8.77,
    //             city: "Newport Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92663",
    //             distance: 8.145,
    //             city: "Newport Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92660",
    //             distance: 9.842,
    //             city: "Newport Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92628",
    //             distance: 8.071,
    //             city: "Costa Mesa",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92627",
    //             distance: 7.297,
    //             city: "Costa Mesa",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92615",
    //             distance: 5.782,
    //             city: "Huntington Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92646",
    //             distance: 4.812,
    //             city: "Huntington Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92648",
    //             distance: 3.07,
    //             city: "Huntington Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92626",
    //             distance: 6.503,
    //             city: "Costa Mesa",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92707",
    //             distance: 7.989,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92605",
    //             distance: 1.039,
    //             city: "Huntington Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92728",
    //             distance: 5.185,
    //             city: "Fountain Valley",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92799",
    //             distance: 6.323,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92735",
    //             distance: 9.167,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92708",
    //             distance: 3.406,
    //             city: "Fountain Valley",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "90742",
    //             distance: 3.945,
    //             city: "Sunset Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92704",
    //             distance: 5.961,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92647",
    //             distance: 0,
    //             city: "Huntington Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92649",
    //             distance: 2.474,
    //             city: "Huntington Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "90743",
    //             distance: 4.681,
    //             city: "Surfside",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92702",
    //             distance: 7.982,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92655",
    //             distance: 2.052,
    //             city: "Midway City",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92703",
    //             distance: 6.058,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92701",
    //             distance: 8.797,
    //             city: "Santa Ana",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "90853",
    //             distance: 7.221,
    //             city: "Long Beach",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92685",
    //             distance: 2.148,
    //             city: "Westminster",
    //             state: "CA"
    //         },
    //         {
    //             zip_code: "92712",
    //             distance: 8.179,
    //             city: "Santa Ana",
    //             state: "CA"
    //         }
    //  ]
    function handleDistanceInputChange(e) {
        let distanceArray = [];
        ZipAPI.getZipCodesByRadius(location, e.target.value).then(data=>{
            data.data.zip_codes.forEach(zip_code => {
                // filteredByDistance = allItems.filter(item => {
                //     if (item.zipcode === parseInt(zip_code.zip_code)) {
                //         return item
                //     }
                // });
                items.forEach(item => {
                    if (item.zipcode === parseInt(zip_code.zip_code)) {
                        distanceArray.push(item);
                    }
                })
            })
            setItems(distanceArray);
            // console.log(distanceArray)
        })
    }

    return (
        <div>
            <div className = "container">
                <HomeFilterForm
                    visibility = {visibility}
                    placeholder = {placeholder}
                    onSelectChange = {handleFilterChange}
                    onClick = {handleFilterSubmit}
                    onInputChange = {handleFilterInputChange}
                ></HomeFilterForm>
                <HomeSortForm
                    onSortChange = {handleSortChange}
                ></HomeSortForm>
                <HomeZipFilterForm
                    onLocationChange = {handleLocationInputChange}
                    onDistanceChange = {handleDistanceInputChange}
                ></HomeZipFilterForm>
            </div>
            <HomeFeed
                items = {items}
            ></HomeFeed>
        </div>
    );
}

export default Home;