import React from 'react';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';

import VisualizeConfirmed from './visualize_confirmed';
import VisualizeDeaths from './visualize_deaths';

let type = 'County';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        let rate = (this.props.deaths/this.props.confirmed) * 100;
        if(this.props.state === "Alaska") { type = "Borough"}
        if(this.props.state === "Louisiana") { type = "Parish"}
        if(this.props.state !== "Louisiana" && this.props.state !== "Alaska") { type = "County"}
        return (
            <div>
                <Grid container justify="center">
                    <div class="info">
                        {/* <div>Graphs are draggable to the left and right. Hovering over points will show the exact numbers.</div> */}
                        {/* <Paper variant='elevation' elevation={24}> */}
                            <h3>Statistics for {this.props.county} {type}, {this.props.state}</h3>
                            <Chip 
                                id="county-confirmed" 
                                label={
                                    <div>
                                        <div><b>Confirmed:</b></div>
                                        <div>{this.props.confirmed}</div>
                                    </div>
                                }>
                            </Chip>
                            <Chip 
                                id="county-change" 
                                label={
                                    <div>
                                        <div><b>Daily Change:</b></div>
                                        <div>{this.props.change}</div>
                                    </div>
                                }>
                            </Chip>
                            <Chip 
                                id="county-rate" 
                                label={
                                    <div>
                                        <div><b>Fatality Rate:</b></div>
                                        <div>{rate.toFixed(3) + "%"}</div>
                                    </div>
                                }>
                            </Chip>
                            {/* <p><b>Confirmed:</b> {this.props.confirmed} | <b>Fatalities:</b> {this.props.deaths} | <b>Approximate Fatality Rate:</b> {rate.toFixed(3)}%</p> */}
                        {/* </Paper> */}
                    </div>
                </Grid>
                <Grid container justify="center">
                    <Paper id="visualize-confirmed" variant='elevation' elevation={24}><VisualizeConfirmed county={this.props.county} minConfirmed={this.props.minConfirmed} maxConfirmed={this.props.maxConfirmed} thirtyDayArray={this.props.thirtyDayArray}/></Paper>
                    <Paper id="visualize-deaths" variant='elevation' elevation={24}><VisualizeDeaths county={this.props.county} minDeaths={this.props.minDeaths} maxDeaths={this.props.maxDeaths} thirtyDayArray={this.props.thirtyDayArray}/></Paper>
                </Grid>
                {/* <div>
                    <Fab id="graphs-button" size="small" onClick={this.handleClick}>
                        <AddIcon />
                    </Fab>
                    <Popover id="graphs-popover" anchorReference="anchorPosition" anchorPosition={{top: 600, left: 0}} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} transformationOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.open} onClose={this.handleClick}>
                        <div id="graphs-popover-contents">
                                <p>Be sure to swipe the graph and click on the dots for more info!</p>
                        </div>
                    </Popover>
                </div> */}
            </div>
        )  
    }
}

export default Info;