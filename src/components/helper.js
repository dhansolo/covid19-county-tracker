import React from 'react';

import Fab from '@material-ui/core/Fab';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Popover from '@material-ui/core/Popover';

class Helper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClick = (event) => {
        this.setState({
            open: !this.state.open
        })
    }

    render = () => {
        return (
            <div>
                <Fab id="helper-button" size="small" onClick={this.handleClick}>
                    <PriorityHighIcon />
                </Fab>
                <Popover id="helper-popover" anchorReference="anchorPosition" anchorPosition={{top: 10, left: 1500}} anchorOrigin={{vertical: 'top', horizontal: 'right'}} transformationOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.open} onClose={this.handleClick}>
                    <div id="helper-contents">
                        <h2>Things to know:</h2>
                        <ul>
                            <li>Data is only for the 50 states of the USA</li>
                            <li>You must select a State before you can select a County</li>
                            <li>Graphs are swipeable in order to view data across a 30 day period</li>
                            <li>Points on graphs are clickable to view exact data</li>
                            <li>Data is updated by John Hopkins University by 12am PST everyday</li>
                            <li>Some counties may not have enough data or no data at all</li>
                        </ul>
                    </div>
                </Popover>
            </div>
        )
    }
}

export default Helper