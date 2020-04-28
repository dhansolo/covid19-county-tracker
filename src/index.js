import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// Create a date string in the format YYYY-MM-DD
let date = new Date();
let current;
if((date.getMonth() + 1) < 10) {
    current = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
} else {
    current = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1);
}

let confirmed;
let deaths;

class SearchAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            county: "",
            state: "Alabama",
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
                data: null
            });
        } else {
            console.log("please enter a county");
        }
    }

    handleStateChange(event) {
        this.setState({
            state: event.target.value,
            data: null
        });
    }

    handleSearchClick() {
        if(this.state.county === "" || this.state.state === "") { return; }
        // console.log(this.state.county);
        // console.log(this.state.state);
        let reformattedCounty = this.state.county[0].toUpperCase() + this.state.county.slice(1);
        let reformattedState = this.state.state[0].toUpperCase() + this.state.state.slice(1);
        this.setState({ county: reformattedCounty, state: reformattedState})
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
                "city_name":this.state.county,
                "date":current,
                "q":"US " + this.state.state
            }
        })
        .then((response)=>{
            // console.log(response);
            if(response.data.data.length > 0) {
                this.setState({ data: response.data.data[0].region.cities[0], notFound: false });
                confirmed = this.state.data.confirmed;
                deaths = this.state.data.deaths;
                // console.log(confirmed, deaths);
            } else {
                this.setState({ data: null, notFound: true });
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        let info;
        let notfound;
        if(this.state.data) {
            info = <Info confirmed={this.state.data.confirmed} deaths={this.state.data.deaths} county={this.state.county} state={this.state.state}/>;
        }
        if(this.state.notFound) {
            notfound = <NotFound />
        }
        return (
            <div>
                <div class="search">
                    <TextField type="text" placeholder="County" value={this.state.county} onChange={this.handleCountyChange}></TextField>
                    <Select type="text" value={this.state.state} onChange={this.handleStateChange}>
                        <MenuItem value="" defaultValue disabled>Select State</MenuItem>
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
                </div>
                <div><Button variant="contained" color="primary" onClick={this.handleSearchClick}>Search</Button></div>
                {info}
                {notfound}
            </div>
        )
    }
}

class Info extends React.Component {
    render() {
        let rate = (this.props.deaths/this.props.confirmed) * 100;
        return (
            <div class="info">
                <h3>Statistics for {this.props.county} County, {this.props.state}</h3>
                <h4>Confirmed: {this.props.confirmed}</h4>
                <h4>Deaths: {this.props.deaths}</h4>
                <h4>Approximate Death Rate: {rate.toFixed(3)}%</h4>
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
            data: null
        }
    }
    componentDidMount() {
        axios({
            "method":"GET",
            "url":"https://covid-19-statistics.p.rapidapi.com/reports/total",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"covid-19-statistics.p.rapidapi.com",
                "x-rapidapi-key":"3de6fc79fbmshc411c445cdb1522p19aee5jsn38ed18b78689"
            },"params":{
                "date":current
            }
            })
            .then((response)=>{
              this.setState({ data: response.data.data});
            })
            .catch((error)=>{
              console.log(error)
            })
    }
    render() {
        let data;
        if(this.state.data) {
            data = <DisplayWorldData data={this.state.data}/>
        }
        return (
            <div>
                {data}
            </div>
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
                <p>Confirmed: {this.props.data.confirmed} | Recovered: {this.props.data.recovered} | Deaths: {this.props.data.deaths} | Death Rate: {rate.toFixed(3)}%</p>
            </div>
        )
    }
}

function App() {
    return (
        <Grid container justify="center">
            <div class="main">
                <div class="headers">
                    <h1>COVID-19 County Tracker</h1>
                    <h4>Data as of {current}</h4>
                </div>
                <div class="search"><SearchAPI /></div>
                <footer class="world-data"><WorldData /></footer>
            </div>
        </Grid>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));