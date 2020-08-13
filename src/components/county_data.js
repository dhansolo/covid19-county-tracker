import React from 'react';
import axios from 'axios';
import moment from 'moment/moment';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Info from './info';
import LoadingScreen from './loading_screen';
import NotFound from './not_found';

import currentDate from './../utilities/current_date';
import usa from './../utilities/states_counties';

let current;
let thirtyDayArray = [];
let selectedStateCounties = <MenuItem id="county-placeholder" disabled>Please Select a State</MenuItem>;
let date = moment().subtract(1, 'days');
let info = null;

let minConfirmed = null;
let minDeaths = null;
let maxConfirmed = null;
let maxDeaths = null;

let noData = false;

let usaItems = Object.keys(usa).map((state, i) => 
    <MenuItem key={i} value={state}>{state}</MenuItem>
)

class CountyData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            county: "",
            state: "",
            loading: false,
            data: null,
            notFound: false,
        }
    }

    // Every keypress in the County input field will cause an update
    handleCountyChange = (event) => {
        if(this.state.loading) { event.preventDefault(); return; }
        if(event.target.value) {
            this.setState({
                county: event.target.value,
                data: null,
                notFound: false
            });
        } else if(event.target.value === "") {
            this.setState({
                county: "",
                data: null,
                notFound: false
            });
        }
    }

    // When a state is selected on the dropdown menu
    handleStateChange = (event) => {
        if(this.state.loading) { event.preventDefault(); return; }
        selectedStateCounties = null;
        selectedStateCounties = Object.values(usa[event.target.value]).map((county, i) =>
            <MenuItem key={i} value={county}>{county}</MenuItem>
        );
        this.setState({
            state: event.target.value,
            data: null,
            notFound: false
        });
    }

    // This is where all of the movement occurs
    handleSearchClick = () => {
        if(this.state.county === "" || this.state.state === "" || this.state.loading) { return; }
        // Reset all necessary variables before you search again
        thirtyDayArray = [];
        this.setState({ data: null});
        info = null;
        minConfirmed = null;
        minDeaths = null;
        maxConfirmed = null;
        maxDeaths = null;
        let count = 0;
        noData = false;

        this.setState({ county: this.state.county, loading: true, notFound: false, data: null}); 
        // Looping 30 times to get 30 days worth of data
        while(count < 30) {  
            date = moment().subtract(1 + count, 'days');
            current = "";
            if(date.month() + 1 < 10) {
                if(date.date() < 10) {
                    current = date.year() + "-0" + (date.month() + 1) + "-0" + date.date();
                } else {
                    current = date.year() + "-0" + (date.month() + 1) + "-" + date.date();
                }
            } else {
                if(date.date() < 10) {
                    current = date.year() + "-" + (date.month() + 1) + "-0" + date.date();
                } else {
                    current = date.year() + "-" + (date.month() + 1) + "-" + date.date();
                }
            }
            this.getData(current);
            count++;
        }
    }

    // Function to make the Axios http request so that the above looks cleaner
    getData = (current) => {
        // API doesn't like the word 'county' so I'm reformatting the user's terms here to omit 'county'
        // as well as adjusting the casing as the API likes exactness
        let reformattedCounty = this.state.county.toLowerCase();
        if(reformattedCounty.includes("county")) {
            reformattedCounty = reformattedCounty.substring(0, reformattedCounty.indexOf("county") - 1);
        } else if(reformattedCounty.includes("borough")) {
            reformattedCounty = reformattedCounty.substring(0, reformattedCounty.indexOf("borough") - 1);
        } else if(reformattedCounty.includes("parish")) {
            reformattedCounty = reformattedCounty.substring(0, reformattedCounty.indexOf("parish") - 1);
        }
        return axios({
            "method":"GET",
            "url":"https://covid-19-statistics.p.rapidapi.com/reports",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host": process.env.REACT_APP_HOST,
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            },
            "params":{
                "region_province":this.state.state,
                "iso":"USA",
                "region_name":"US",
                "city_name":reformattedCounty,
                "date":current,
                "q":"US " + this.state.state
            }
        })
        .then((response)=>{
            if(response.data.data.length > 0 && !noData) {
                // console.log("data found");
                // console.log(response.data.data);
                if(current === currentDate) {
                    this.setState({ data: response.data.data[0].region.cities[0], notFound: false});
                }
                if(response.data.data[0].region.cities[0].confirmed_diff < minConfirmed || minConfirmed === null) { 
                    minConfirmed = response.data.data[0].region.cities[0].confirmed_diff; 
                    if(minConfirmed < 0) {
                        minConfirmed = 0;
                    }
                }
                if(response.data.data[0].region.cities[0].confirmed_diff > maxConfirmed || maxConfirmed === null) { 
                    maxConfirmed = response.data.data[0].region.cities[0].confirmed_diff; 
                    if(maxConfirmed < 0) {
                        maxConfirmed = 0;
                    }
                }
                if(response.data.data[0].region.cities[0].deaths_diff < minDeaths || minDeaths === null) { 
                    minDeaths = response.data.data[0].region.cities[0].deaths_diff; 
                    if(minDeaths < 0) {
                        minDeaths = 0;
                    }
                }
                if(response.data.data[0].region.cities[0].deaths_diff > maxDeaths || maxDeaths === null) { 
                    maxDeaths = parseInt(response.data.data[0].region.cities[0].deaths_diff, 10); 
                    if(maxDeaths < 0) {
                        maxDeaths = 0;
                    }
                }
                // Push data into thirtyDayArray array
                thirtyDayArray.push(
                    {
                        date: current,
                        confirmed: (response.data.data[0].region.cities[0].confirmed_diff < 0 ? 0 : response.data.data[0].region.cities[0].confirmed_diff),
                        deaths: (response.data.data[0].region.cities[0].deaths_diff < 0 ? 0 : response.data.data[0].region.cities[0].deaths_diff)
                    }
                )
                // Sort it by date after every push
                thirtyDayArray.sort((a, b) => new Date(a.date) - new Date(b.date));
                if(thirtyDayArray.length === 30) {
                    // Will not stop loading until there is exactly 30 items in the array
                    // console.log(thirtyDayArray);
                    this.setState({ loading: false })
                }
            } else {
                // Data not found
                if(!noData) {
                    // console.log("no data found");
                    noData = true;
                    this.setState({ data: null, notFound: true, loading: false});
                }
                return;
            }
        })
        .catch((error)=>{
            console.log(error);
            return;
        }) 
    }

    render = () => {
        if(this.state.data && !this.state.loading) {
            // console.log(this.state.data);
            // Throwing everything to the Info component to render
            // console.log(this.state.data);
            info = <Info 
                confirmed={this.state.data.confirmed} 
                change={this.state.data.confirmed_diff}
                deaths={this.state.data.deaths} 
                county={this.state.data.name} 
                state={this.state.state} 
                minConfirmed={minConfirmed} 
                minDeaths={minDeaths}
                maxConfirmed={maxConfirmed}
                maxDeaths={maxDeaths}
                thirtyDayArray={thirtyDayArray}
                />;
        }
        let loadImage = null;
        let notfound = null;
        if(this.state.loading) {
            loadImage = <LoadingScreen id="loading"/>
        }
        if(this.state.notFound) {
            notfound = <NotFound />
        } else {
            notfound = null;
        }
        return (
            <div>
                <div className="search">
                    <FormControl variant="filled" id="search-state">
                        <InputLabel>State</InputLabel>
                        <Select type="text" value={this.state.state} onChange={this.handleStateChange}>
                            {usaItems}
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" id="search-county">
                        <InputLabel>County</InputLabel>
                        <Select id="dropdown" type="text" value={this.state.county} onChange={this.handleCountyChange}>
                            {selectedStateCounties}
                        </Select>
                    </FormControl>
                </div>
                <Button id="search-button" variant="contained" color="secondary" onClick={this.handleSearchClick}>Search</Button>
                <div id="result">
                    {info}
                    {loadImage}
                    {notfound}
                </div>
            </div>
        )
    }
}

export default CountyData;