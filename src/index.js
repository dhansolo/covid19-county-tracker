import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './index.css';

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
            state: "",
            data: null
        }
        this.handleCountyChange = this.handleCountyChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleCountyChange(event) {
        this.setState({
            county: event.target.value,
        });
    }

    handleStateChange(event) {
        this.setState({
            state: event.target.value,
        });
    }

    handleSearchClick() {
        // console.log(this.state.county);
        // console.log(this.state.state);
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
            console.log(response);
            this.setState({ data: response.data.data[0].region.cities[0] });
            confirmed = this.state.data.confirmed;
            deaths = this.state.data.deaths;
            // console.log(confirmed, deaths);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        let info;
        if(this.state.data) {
            info = <Info confirmed={this.state.data.confirmed} deaths={this.state.data.deaths} county={this.state.county}/>;
        }
        return (
            <div>
                <div><input type="text" placeholder="County" value={this.state.county} onChange={this.handleCountyChange}></input></div>
                <div><input type="text" placeholder="State" value={this.state.state} onChange={this.handleStateChange}></input></div>
                <div><button onClick={this.handleSearchClick}>Search</button></div>
                {info}
            </div>
        )
    }
}

class Info extends React.Component {
    render() {
        let rate = (this.props.deaths/this.props.confirmed) * 100;
        // console.log(rate.toFixed(3));
        return (
            <div>
                <h2>Confirmed: {this.props.confirmed}</h2>
                <h2>Deaths: {this.props.deaths}</h2>
                <h2>Approximate Death Rate: {rate.toFixed(3)}%</h2>
            </div>
        )
    }
}

function App() {
    return (
        <div><SearchAPI /></div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));