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
            info = <Info confirmed={this.state.data.confirmed} deaths={this.state.data.deaths} county={this.state.county} state={this.state.state}/>;
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
        return (
            <div>
                <h2>Statistics for {this.props.county} County, {this.props.state}</h2>
                <h3>Confirmed: {this.props.confirmed}</h3>
                <h3>Deaths: {this.props.deaths}</h3>
                <h3>Approximate Death Rate: {rate.toFixed(3)}%</h3>
            </div>
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
        console.log(this.props.data);
        let rate = (this.props.data.fatality_rate * 100);
        return(
            <div>
                <h4>World Statistics</h4>
                <h5>Confirmed: {this.props.data.confirmed} | Recovered: {this.props.data.recovered} | Deaths: {this.props.data.deaths} | Death Rate: {rate.toFixed(3)}%</h5>
            </div>
        )
    }
}

function App() {
    return (
        <div>
            <div><h1>Data as of {current}</h1></div>
            <div><SearchAPI /></div>
            <div><WorldData /></div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));