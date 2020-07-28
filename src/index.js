import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as moment from 'moment/moment';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

import WorldData from './components/world_data'
import CountyData from './components/county_data';

function App() {
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <div class="main">
                    <div class="headers">
                        <h1>COVID-19 County Tracker</h1>
                        <Chip id="date-chip" label={"Data as of " + moment().subtract(1, 'days').format("MMMM DD, YYYY") + " from John Hopkins University"}></Chip>
                    </div>
                    <header class="world-data"><WorldData /></header>
                    <div class="search"><CountyData /></div>
                    <footer>
                        <Link href="https://www.linkedin.com/in/davidhan93/"><Chip id="chip" avatar={<Avatar>DH</Avatar>} label="Created by David Han" clickable></Chip></Link>
                        <Link href="https://www.linkedin.com/in/john-son-997aaa175/"><Chip id="chip" avatar={<Avatar>JS</Avatar>} label="Styled by John Son" clickable></Chip></Link>
                    </footer>
                </div>
            </Grid>
        </Grid>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
