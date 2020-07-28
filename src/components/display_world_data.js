import React from 'react';
import Chip from '@material-ui/core/Chip';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DisplayWorldData extends React.Component {
    render() {
        let rate = (this.props.data.fatality_rate * 100);
        return(
            <div>
                <h3>World Statistics</h3>
                <div>
                    <Chip 
                        id="world-confirmed" 
                        label={
                            <div>
                                <div><b>Confirmed:</b></div>
                                <div>{numberWithCommas(this.props.data.confirmed)}</div>
                            </div>
                        }>
                    </Chip>
                    <Chip 
                        id="world-recovered" 
                        label={
                            <div>
                                <div><b>Recovered:</b></div>
                                <div>{numberWithCommas(this.props.data.recovered)}</div>
                            </div>
                        }>
                    </Chip>
                    {/* <Chip 
                        id="world-deaths" 
                        label={
                            <div>
                                <div><b>Fatalities:</b></div>
                                <div>{numberWithCommas(this.props.data.deaths)}</div>
                            </div>
                        }>
                    </Chip> */}
                    <Chip 
                        id="world-rate" 
                        label={
                            <div>
                                <div><b>Fatality Rate:</b></div>
                                <div>{rate.toFixed(3) + "%"}</div>
                            </div>
                        }>
                    </Chip>
                </div>
                <p></p>
            </div>
        )
    }
}

export default DisplayWorldData;