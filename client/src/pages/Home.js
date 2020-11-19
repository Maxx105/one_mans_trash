import React, { useState, useEffect, useContext } from "react";
import HomeFeed from "../components/HomeFeed";
import HomeFilterForm from "../components/HomeFilterForm";
import HomeSortForm from "../components/HomeSortForm";
// import ItemCard from "../components/ItemCard";
import ItemAPI from "../utils/ItemAPI";

function Home() {
    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [placeholder, setPlaceholder] = useState('');
    const [visibility, setVisibility] = useState('hidden');
    const [filterString, setFilterString] = useState('');
    const [filterParam, setFilterParam] = useState('');
    const [sortString, setSortString] = useState('');

    useEffect(() => {
        ItemAPI.getAllItems().then(data=>{
            setItems(data)
            setAllItems(data.slice(0))
        });
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
            </div>
            <HomeFeed
                items = {items}
            ></HomeFeed>
        </div>
    );
}
export default Home;