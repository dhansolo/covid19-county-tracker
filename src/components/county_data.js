import React from 'react';
import axios from 'axios';
import * as moment from 'moment/moment';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Info from './info';
import LoadingScreen from './loading_screen';
import NotFound from './not_found';

import currentDate from './../utilities/current_date';
// import thirtyDayArray from './../utilities/thirty_days';

let current;
let thirtyDayArray = [];
let date = moment().subtract(1, 'days');
let info = null;

let minConfirmed = null;
let minDeaths = null;
let maxConfirmed = null;
let maxDeaths = null;

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
        this.handleCountyChange = this.handleCountyChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    // Every keypress in the County input field will cause an update
    handleCountyChange(event) {
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
    handleStateChange(event) {
        this.setState({
            state: event.target.value,
            data: null,
            notFound: false
        });
    }

    // This is where all of the movement occurs
    handleSearchClick() {
        if(this.state.county === "" || this.state.state === "") { return; }
        // Reset all necessary variables before you search again
        thirtyDayArray = [];
        this.setState({ data: null});
        info = null;
        minConfirmed = null;
        minDeaths = null;
        maxConfirmed = null;
        maxDeaths = null;
        let count = 0;

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
    getData(current) {
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
            if(response.data.data.length > 0) {
                if(current === currentDate) {
                    this.setState({ data: response.data.data[0].region.cities[0], notFound: false});
                }
                if(response.data.data[0].region.cities[0].confirmed_diff < minConfirmed || minConfirmed === null) { 
                    minConfirmed = response.data.data[0].region.cities[0].confirmed_diff; 
                }
                if(response.data.data[0].region.cities[0].confirmed_diff > maxConfirmed || maxConfirmed === null) { 
                    maxConfirmed = response.data.data[0].region.cities[0].confirmed_diff; 
                }
                if(response.data.data[0].region.cities[0].deaths_diff < minDeaths || minDeaths === null) { 
                    minDeaths = response.data.data[0].region.cities[0].deaths_diff; 
                }
                if(response.data.data[0].region.cities[0].deaths_diff > maxDeaths || maxDeaths === null) { 
                    maxDeaths = response.data.data[0].region.cities[0].deaths_diff; 
                }
                // Push data into thirtyDayArray array
                thirtyDayArray.push(
                    {
                        date: current,
                        confirmed: response.data.data[0].region.cities[0].confirmed_diff,
                        deaths: response.data.data[0].region.cities[0].deaths_diff
                    }
                )
                // Sort it by date after every push
                thirtyDayArray.sort((a, b) => new Date(a.date) - new Date(b.date));
                if(thirtyDayArray.length === 30) {
                    // Will not stop loading until there is exactly 30 items in the array
                    this.setState({ loading: false })
                }
            } else {
                // Data not found
                this.setState({ data: null, notFound: true, loading: false});
            }
        })
        .catch((error)=>{
            console.log(error);
            return;
        }) 
    }

    render() {
        if(this.state.data && !this.state.loading) {
            // console.log(this.state.data);
            // Throwing everything to the Info component to render
            info = <Info 
                confirmed={this.state.data.confirmed} 
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
        if(this.state.loading) {loadImage = <LoadingScreen id="loading"/>}
        if(this.state.notFound) {notfound = <NotFound />}
        return (
            <div>
                <div class="search">
                    <TextField id="search-county" type="text" label="County" variant="filled" value={this.state.county} onChange={this.handleCountyChange}></TextField>
                    <FormControl variant="filled" id="search-state">
                        <InputLabel>State</InputLabel>
                        <Select type="text" value={this.state.state} onChange={this.handleStateChange}>
                            <MenuItem value="Alabama">Alabama</MenuItem>
                            <MenuItem value="Alaska">Alaska</MenuItem>
                            <MenuItem value="Arizona">Arizona</MenuItem>
                            <MenuItem value="Arkansas">Arkansas</MenuItem>
                            <MenuItem value="California">California</MenuItem>
                            <MenuItem value="Colorado">Colorado</MenuItem>
                            <MenuItem value="Connecticut">Connecticut</MenuItem>
                            <MenuItem value="Delaware">Delaware</MenuItem>
                            <MenuItem value="Florida">Florida</MenuItem>
                            <MenuItem value="Georgia">Georgia</MenuItem>
                            <MenuItem value="Hawaii">Hawaii</MenuItem>
                            <MenuItem value="Idaho">Idaho</MenuItem>
                            <MenuItem value="Illinois">Illinois</MenuItem>
                            <MenuItem value="Indiana">Indiana</MenuItem>
                            <MenuItem value="Iowa">Iowa</MenuItem>
                            <MenuItem value="Kansas">Kansas</MenuItem>
                            <MenuItem value="Kentucky">Kentucky</MenuItem>
                            <MenuItem value="Louisiana">Louisiana</MenuItem>
                            <MenuItem value="Maine">Maine</MenuItem>
                            <MenuItem value="Maryland">Maryland</MenuItem>
                            <MenuItem value="Massachusetts">Massachusetts</MenuItem>
                            <MenuItem value="Michigan">Michigan</MenuItem>
                            <MenuItem value="Minnesota">Minnesota</MenuItem>
                            <MenuItem value="Mississippi">Mississippi</MenuItem>
                            <MenuItem value="Missouri">Missouri</MenuItem>
                            <MenuItem value="Montana">Montana</MenuItem>
                            <MenuItem value="Nebraska">Nebraska</MenuItem>
                            <MenuItem value="Nevada">Nevada</MenuItem>
                            <MenuItem value="New Hampshire">New Hampshire</MenuItem>
                            <MenuItem value="New Jersey">New Jersey</MenuItem>
                            <MenuItem value="New Mexico">New Mexico</MenuItem>
                            <MenuItem value="New York">New York</MenuItem>
                            <MenuItem value="North Carolina">North Carolina</MenuItem>
                            <MenuItem value="North Dakota">North Dakota</MenuItem>
                            <MenuItem value="Ohio">Ohio</MenuItem>
                            <MenuItem value="Oklahoma">Oklahoma</MenuItem>
                            <MenuItem value="Oregon">Oregon</MenuItem>
                            <MenuItem value="Pennsylvania">Pennsylvania</MenuItem>
                            <MenuItem value="Rhode Island">Rhode Island</MenuItem>
                            <MenuItem value="South Carolina">South Carolina</MenuItem>
                            <MenuItem value="South Dakota">South Dakota</MenuItem>
                            <MenuItem value="Tennessee">Tennessee</MenuItem>
                            <MenuItem value="Texas">Texas</MenuItem>
                            <MenuItem value="Utah">Utah</MenuItem>
                            <MenuItem value="Vermont">Vermont</MenuItem>
                            <MenuItem value="Virginia">Virginia</MenuItem>
                            <MenuItem value="Washington">Washington</MenuItem>
                            <MenuItem value="West Virginia">West Virginia</MenuItem>
                            <MenuItem value="Wisconsin">Wisconsin</MenuItem>
                            <MenuItem value="Wyoming">Wyoming</MenuItem>
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