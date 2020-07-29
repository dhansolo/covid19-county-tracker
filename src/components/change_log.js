import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';

class ChangeLog extends React.Component {
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
        return (
            <div>
                <Fab id="change-log-button" size="small" onClick={this.handleClick}>
                    <AddIcon />
                </Fab>
                <Popover id="change-log-popover" anchorReference="anchorPosition" anchorPosition={{top: 10, left: 0}} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} transformationOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.open} onClose={this.handleClick}>
                    <div id="change-log-contents">
                        <h2>Update 07.28.2020</h2>
                        <ul>
                            <li>Added this change log button to better communicate changes</li>
                            <li>Dynamic propagtion of States and Counties so you no longer have to type out the County name</li>
                            <li>Removed any mention of fatalities, except for the graph, as it is not data I wish the user to focus on</li>
                            <li>Added 'Daily Change' stat to showcase the change in new cases per day</li>
                            <li>Fixed bug where setting the state to Alaska or Louisiana and searching would cause the default county type to be "Parish" or "Borough" instead of "County" for sequential searches</li>
                            <li>Updated 'Not Found' message</li>
                        </ul>
                    </div>
                </Popover>
            </div>
        )
    }
}

export default ChangeLog;