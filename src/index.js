import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {VictoryChart, VictoryLine} from 'victory';

// Create a date string in the format YYYY-MM-DD
let date = new Date();
let current;
let currentDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);

let sevenDay = [];
let info = null;

let minConfirmed = null;
let minDeaths = null;
let maxConfirmed = null;
let maxDeaths = null;

class SearchAPI extends React.Component {
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

    handleCountyChange(event) {
        if(event.target.value) {
            this.setState({
                county: event.target.value,
                data: null,
                loading: false
            });
        } else if(event.target.value === "") {
            this.setState({
                county: "",
                data: null,
                loading: false
            });
        }
    }

    handleStateChange(event) {
        this.setState({
            state: event.target.value,
            data: null
        });
    }

    async handleSearchClick() {
        sevenDay = [];
        this.setState({ data: null});
        info = null;
        if(this.state.county === "" || this.state.state === "") { return; }
        let reformattedState = this.state.state[0].toUpperCase() + this.state.state.slice(1);
        let reformattedCounty = this.state.county.toLowerCase();
        if(reformattedCounty.includes("county")) {
            reformattedCounty = reformattedCounty.substring(0, reformattedCounty.indexOf("county") - 1);
        }
        reformattedCounty = reformattedCounty[0].toUpperCase() + reformattedCounty.slice(1);

        this.setState({ county: reformattedCounty, state: reformattedState, loading: true, notFound: false, data: null});  
        let count = 0;
        while(count < 7) {  
            current = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + (date.getDate() - count - 1);
            // console.log(current);
            this.callAxios(current);
            count++;
        }
    }

    async callAxios(current) {
        return axios({
            "method":"GET",
            "url":"https://covid-19-statistics.p.rapidapi.com/reports",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host": "",
                "x-rapidapi-key": ""
            },
            "params":{
                "region_province":this.state.state,
                "iso":"USA",
                "region_name":"US",
                "city_name":this.state.county,
                "date":current,
                "q":"US " + this.state.state
            }
        })
        .then((response)=>{
            //console.log(response);
            if(response.data.data.length > 0) {
                if(current === currentDate) {
                    this.setState({ data: response.data.data[0].region.cities[0], notFound: false});
                }
                // console.log(response.data.data[0].region.cities[0].date);
                if(response.data.data[0].region.cities[0].confirmed < minConfirmed || minConfirmed === null) { 
                    minConfirmed = response.data.data[0].region.cities[0].confirmed; 
                }
                if(response.data.data[0].region.cities[0].confirmed > maxConfirmed || maxConfirmed === null) { 
                    maxConfirmed = response.data.data[0].region.cities[0].confirmed; 
                }
                if(response.data.data[0].region.cities[0].deaths < minDeaths || minDeaths === null) { 
                    minDeaths = response.data.data[0].region.cities[0].deaths; 
                }
                if(response.data.data[0].region.cities[0].deaths > maxDeaths || maxDeaths === null) { 
                    maxDeaths = response.data.data[0].region.cities[0].deaths; 
                }
                sevenDay.push(
                    {
                        date: current,
                        confirmed: response.data.data[0].region.cities[0].confirmed,
                        deaths: response.data.data[0].region.cities[0].deaths
                    }
                )
                sevenDay.sort((a, b) => new Date(a.date) - new Date(b.date));
                //console.log(sevenDay);
                if(sevenDay.length === 7) {
                    this.setState({ loading: false })
                }
            } else {
                this.setState({ data: null, notFound: true, loading: false});
            }
        })
        .catch((error)=>{
            console.log(error);
            return;
        }) 
    }

    render() {
        let notfound;
        let loadImage;
        if(this.state.data && !this.state.loading) {
            info = <Info 
                confirmed={this.state.data.confirmed} 
                deaths={this.state.data.deaths} 
                county={this.state.county} 
                state={this.state.state} 
                minConfirmed={minConfirmed} 
                minDeaths={minDeaths}
                maxConfirmed={maxConfirmed}
                maxDeaths={maxDeaths}
                />;
        }
        if(this.state.loading) {loadImage = <LoadingScreen />}
        if(this.state.notFound) {notfound = <NotFound />}
        return (
            <div>
                <div class="search">
                    <TextField id="search-county" type="text" label="County" value={this.state.county} onChange={this.handleCountyChange}></TextField>
                    <FormControl id="search-state">
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
                <Button id="search-button" variant="outlined" size="small" onClick={this.handleSearchClick}>Search</Button>
                <div id="result">
                    {info}
                    {loadImage}
                    {notfound}
                </div>
            </div>
        )
    }
}

class Info extends React.Component {
    render() {
        // console.log("info rendering");
        // console.log(visualizeConfirmed)
        let rate = (this.props.deaths/this.props.confirmed) * 100;
        return (
            <div>
                <Grid container justify="center">
                    <div class="info">
                        <Grid item xs={12}>
                            <h3>Statistics for {this.props.county} County, {this.props.state}</h3>
                            <h4>Confirmed: {this.props.confirmed}</h4>
                            <h4>Fatalities: {this.props.deaths}</h4>
                            <h4>Approximate Fatality Rate: {rate.toFixed(3)}%</h4>
                        </Grid>
                        <Grid container>
                                <VisualizeConfirmed county={this.props.county} minConfirmed={this.props.minConfirmed} maxConfirmed={this.props.maxConfirmed}/>
                                <VisualizeDeaths county={this.props.county} minDeaths={this.props.minDeaths} maxDeaths={this.props.maxDeaths}/>
                        </Grid>
                    </div>
                </Grid>
            </div>
        )  
    }
}

class VisualizeConfirmed extends React.Component {
    render() {
        return(
            <div>
                <p>Confirmed Cases Over 7 Days for {this.props.county} County</p>
                <VictoryChart>
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid black", width: "10%"}
                        }}
                        data={[
                            {x: sevenDay[0].date.substring(5, sevenDay[0].date.length), y: sevenDay[0].confirmed},
                            {x: sevenDay[1].date.substring(5, sevenDay[1].date.length), y: sevenDay[1].confirmed},
                            {x: sevenDay[2].date.substring(5, sevenDay[2].date.length), y: sevenDay[2].confirmed},
                            {x: sevenDay[3].date.substring(5, sevenDay[3].date.length), y: sevenDay[3].confirmed},
                            {x: sevenDay[4].date.substring(5, sevenDay[4].date.length), y: sevenDay[4].confirmed},
                            {x: sevenDay[5].date.substring(5, sevenDay[5].date.length), y: sevenDay[5].confirmed},
                            {x: sevenDay[6].date.substring(5, sevenDay[6].date.length), y: sevenDay[6].confirmed},
                        ]}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        domain={{
                            y: [this.props.minConfirmed - 1000, this.props.maxConfirmed + 1000]
                        }}
                    />
                </VictoryChart>
            </div>
        )
    }
}

class VisualizeDeaths extends React.Component {
    render() {
        return(
            <div>
                <p>Deaths Over 7 Days for {this.props.county} County</p>
                <VictoryChart>
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid black", width: "10%"}
                        }}
                        data={[
                            {x: sevenDay[0].date.substring(5, sevenDay[0].date.length), y: sevenDay[0].deaths},
                            {x: sevenDay[1].date.substring(5, sevenDay[1].date.length), y: sevenDay[1].deaths},
                            {x: sevenDay[2].date.substring(5, sevenDay[2].date.length), y: sevenDay[2].deaths},
                            {x: sevenDay[3].date.substring(5, sevenDay[3].date.length), y: sevenDay[3].deaths},
                            {x: sevenDay[4].date.substring(5, sevenDay[4].date.length), y: sevenDay[4].deaths},
                            {x: sevenDay[5].date.substring(5, sevenDay[5].date.length), y: sevenDay[5].deaths},
                            {x: sevenDay[6].date.substring(5, sevenDay[6].date.length), y: sevenDay[6].deaths},
                        ]}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        domain={{
                            y: [this.props.minDeaths - 100, this.props.maxDeaths + 100]
                        }}
                    />
                </VictoryChart>
            </div>
        )
    }
}

class NotFound extends React.Component {
    render() {
        return (
            <div class="info">No data found, are you sure you entered the correct County and State?</div>
        )
    }
}

class WorldData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true
        }
    }
    componentDidMount() {
        if((date.getMonth() + 1) < 10) {
            current = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
        } else {
            current = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
        }
        axios({
            "method":"GET",
            "url":"https://covid-19-statistics.p.rapidapi.com/reports/total",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host": "",
                "x-rapidapi-key": ""
            },"params":{
                "date":current
            }
            })
            .then((response)=>{
              this.setState({ data: response.data.data, loading: false});
            })
            .catch((error)=>{
              console.log(error)
            })
    }
    render() {
        let data;
        let loadImage;
        if(this.state.loading) {
            loadImage = <LoadingScreen />
        }
        if(this.state.data) {
            data = <DisplayWorldData data={this.state.data}/>
        }
        return (
            <div>
                {loadImage}
                {data}
            </div>
        )
    }
}

class LoadingScreen extends React.Component {
    render() {
        return (
            <CircularProgress />
        )
    }
}

class DisplayWorldData extends React.Component {
    render() {
        // console.log(this.props.data);
        let rate = (this.props.data.fatality_rate * 100);
        return(
            <div>
                <h4>World Statistics</h4>
                <p>Confirmed: {this.props.data.confirmed} | Recovered: {this.props.data.recovered} | Fatalities: {this.props.data.deaths} | Fatality Rate: {rate.toFixed(3)}%</p>
            </div>
        )
    }
}

function App() {
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <div class="main">
                    <div class="headers">
                        <h1>COVID-19 County Tracker</h1>
                        <h4>Data as of {currentDate}</h4>
                    </div>
                    <div class="search"><SearchAPI /></div>
                    <footer class="world-data"><WorldData /></footer>
                </div>
            </Grid>
        </Grid>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

/*
current = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
axios({
    "method":"GET",
    "url":"https://covid-19-statistics.p.rapidapi.com/reports",
    "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"",
        "x-rapidapi-key":""
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
    // console.log(response);
    if(response.data.data.length > 0) {
        this.setState({ data: response.data.data[0].region.cities[0], notFound: false, loading: false});
        confirmed = this.state.data.confirmed;
        deaths = this.state.data.deaths;
    } else {
        this.setState({ data: null, notFound: true, loading: false });
    }
})
.catch((error)=>{
    console.log(error);
}) 
*/
