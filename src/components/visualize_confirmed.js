import React from 'react';

import {VictoryChart, VictoryZoomContainer, VictoryTooltip, VictoryLabel, VictoryLine, VictoryScatter} from 'victory';

let type = 'County';

class VisualizeConfirmed extends React.Component {
    render() {
        return(
            <div>
                {/* <p>Changes in Confirmed Cases Over 30 Days for {this.props.county} County</p> */}
                <VictoryChart containerComponent={<VictoryZoomContainer zoomDimension="x" zoomDomain={{x:[22,30]}} allowZoom={false}/>}>
                <VictoryLabel text={"Changes in Confirmed cases Over 30 days for " + this.props.county + " " + type} x={225} y={30} textAnchor="middle"/>
                <VictoryLine
                    name="dates"
                    interpolation="natural"
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid black", width: "10%"},
                    }}
                    data={[
                        {x: this.props.thirtyDayArray[0].date.substring(5, this.props.thirtyDayArray[0].date.length), y: this.props.thirtyDayArray[0].confirmed},
                        {x: this.props.thirtyDayArray[1].date.substring(5, this.props.thirtyDayArray[1].date.length), y: this.props.thirtyDayArray[1].confirmed},
                        {x: this.props.thirtyDayArray[2].date.substring(5, this.props.thirtyDayArray[2].date.length), y: this.props.thirtyDayArray[2].confirmed},
                        {x: this.props.thirtyDayArray[3].date.substring(5, this.props.thirtyDayArray[3].date.length), y: this.props.thirtyDayArray[3].confirmed},
                        {x: this.props.thirtyDayArray[4].date.substring(5, this.props.thirtyDayArray[4].date.length), y: this.props.thirtyDayArray[4].confirmed},
                        {x: this.props.thirtyDayArray[5].date.substring(5, this.props.thirtyDayArray[5].date.length), y: this.props.thirtyDayArray[5].confirmed},
                        {x: this.props.thirtyDayArray[6].date.substring(5, this.props.thirtyDayArray[6].date.length), y: this.props.thirtyDayArray[6].confirmed},
                        {x: this.props.thirtyDayArray[7].date.substring(5, this.props.thirtyDayArray[7].date.length), y: this.props.thirtyDayArray[7].confirmed},
                        {x: this.props.thirtyDayArray[8].date.substring(5, this.props.thirtyDayArray[8].date.length), y: this.props.thirtyDayArray[8].confirmed},
                        {x: this.props.thirtyDayArray[9].date.substring(5, this.props.thirtyDayArray[9].date.length), y: this.props.thirtyDayArray[9].confirmed},
                        {x: this.props.thirtyDayArray[10].date.substring(5, this.props.thirtyDayArray[10].date.length), y: this.props.thirtyDayArray[10].confirmed},
                        {x: this.props.thirtyDayArray[11].date.substring(5, this.props.thirtyDayArray[11].date.length), y: this.props.thirtyDayArray[11].confirmed},
                        {x: this.props.thirtyDayArray[12].date.substring(5, this.props.thirtyDayArray[12].date.length), y: this.props.thirtyDayArray[12].confirmed},
                        {x: this.props.thirtyDayArray[13].date.substring(5, this.props.thirtyDayArray[13].date.length), y: this.props.thirtyDayArray[13].confirmed},
                        {x: this.props.thirtyDayArray[14].date.substring(5, this.props.thirtyDayArray[14].date.length), y: this.props.thirtyDayArray[14].confirmed},
                        {x: this.props.thirtyDayArray[15].date.substring(5, this.props.thirtyDayArray[15].date.length), y: this.props.thirtyDayArray[15].confirmed},
                        {x: this.props.thirtyDayArray[16].date.substring(5, this.props.thirtyDayArray[16].date.length), y: this.props.thirtyDayArray[16].confirmed},
                        {x: this.props.thirtyDayArray[17].date.substring(5, this.props.thirtyDayArray[17].date.length), y: this.props.thirtyDayArray[17].confirmed},
                        {x: this.props.thirtyDayArray[18].date.substring(5, this.props.thirtyDayArray[18].date.length), y: this.props.thirtyDayArray[18].confirmed},
                        {x: this.props.thirtyDayArray[19].date.substring(5, this.props.thirtyDayArray[19].date.length), y: this.props.thirtyDayArray[19].confirmed},
                        {x: this.props.thirtyDayArray[20].date.substring(5, this.props.thirtyDayArray[20].date.length), y: this.props.thirtyDayArray[20].confirmed},
                        {x: this.props.thirtyDayArray[21].date.substring(5, this.props.thirtyDayArray[21].date.length), y: this.props.thirtyDayArray[21].confirmed},
                        {x: this.props.thirtyDayArray[22].date.substring(5, this.props.thirtyDayArray[22].date.length), y: this.props.thirtyDayArray[22].confirmed},
                        {x: this.props.thirtyDayArray[23].date.substring(5, this.props.thirtyDayArray[23].date.length), y: this.props.thirtyDayArray[23].confirmed},
                        {x: this.props.thirtyDayArray[24].date.substring(5, this.props.thirtyDayArray[24].date.length), y: this.props.thirtyDayArray[24].confirmed},
                        {x: this.props.thirtyDayArray[25].date.substring(5, this.props.thirtyDayArray[25].date.length), y: this.props.thirtyDayArray[25].confirmed},
                        {x: this.props.thirtyDayArray[26].date.substring(5, this.props.thirtyDayArray[26].date.length), y: this.props.thirtyDayArray[26].confirmed},
                        {x: this.props.thirtyDayArray[27].date.substring(5, this.props.thirtyDayArray[27].date.length), y: this.props.thirtyDayArray[27].confirmed},
                        {x: this.props.thirtyDayArray[28].date.substring(5, this.props.thirtyDayArray[28].date.length), y: this.props.thirtyDayArray[28].confirmed},
                        {x: this.props.thirtyDayArray[29].date.substring(5, this.props.thirtyDayArray[29].date.length), y: this.props.thirtyDayArray[29].confirmed},
                    ]}
                    animate={{
                        duration: 2000,
                        opacity: 0.0,
                        onLoad: { 
                            duration: 1000,
                            opacity: 1.0
                        },
                    }}
                    domain={{
                        y: [0, this.props.maxConfirmed + 50]
                    }}
                />
                <VictoryScatter 
                    data={[
                        {x: this.props.thirtyDayArray[0].date.substring(5, this.props.thirtyDayArray[0].date.length), y: this.props.thirtyDayArray[0].confirmed},
                        {x: this.props.thirtyDayArray[1].date.substring(5, this.props.thirtyDayArray[1].date.length), y: this.props.thirtyDayArray[1].confirmed},
                        {x: this.props.thirtyDayArray[2].date.substring(5, this.props.thirtyDayArray[2].date.length), y: this.props.thirtyDayArray[2].confirmed},
                        {x: this.props.thirtyDayArray[3].date.substring(5, this.props.thirtyDayArray[3].date.length), y: this.props.thirtyDayArray[3].confirmed},
                        {x: this.props.thirtyDayArray[4].date.substring(5, this.props.thirtyDayArray[4].date.length), y: this.props.thirtyDayArray[4].confirmed},
                        {x: this.props.thirtyDayArray[5].date.substring(5, this.props.thirtyDayArray[5].date.length), y: this.props.thirtyDayArray[5].confirmed},
                        {x: this.props.thirtyDayArray[6].date.substring(5, this.props.thirtyDayArray[6].date.length), y: this.props.thirtyDayArray[6].confirmed},
                        {x: this.props.thirtyDayArray[7].date.substring(5, this.props.thirtyDayArray[7].date.length), y: this.props.thirtyDayArray[7].confirmed},
                        {x: this.props.thirtyDayArray[8].date.substring(5, this.props.thirtyDayArray[8].date.length), y: this.props.thirtyDayArray[8].confirmed},
                        {x: this.props.thirtyDayArray[9].date.substring(5, this.props.thirtyDayArray[9].date.length), y: this.props.thirtyDayArray[9].confirmed},
                        {x: this.props.thirtyDayArray[10].date.substring(5, this.props.thirtyDayArray[10].date.length), y: this.props.thirtyDayArray[10].confirmed},
                        {x: this.props.thirtyDayArray[11].date.substring(5, this.props.thirtyDayArray[11].date.length), y: this.props.thirtyDayArray[11].confirmed},
                        {x: this.props.thirtyDayArray[12].date.substring(5, this.props.thirtyDayArray[12].date.length), y: this.props.thirtyDayArray[12].confirmed},
                        {x: this.props.thirtyDayArray[13].date.substring(5, this.props.thirtyDayArray[13].date.length), y: this.props.thirtyDayArray[13].confirmed},
                        {x: this.props.thirtyDayArray[14].date.substring(5, this.props.thirtyDayArray[14].date.length), y: this.props.thirtyDayArray[14].confirmed},
                        {x: this.props.thirtyDayArray[15].date.substring(5, this.props.thirtyDayArray[15].date.length), y: this.props.thirtyDayArray[15].confirmed},
                        {x: this.props.thirtyDayArray[16].date.substring(5, this.props.thirtyDayArray[16].date.length), y: this.props.thirtyDayArray[16].confirmed},
                        {x: this.props.thirtyDayArray[17].date.substring(5, this.props.thirtyDayArray[17].date.length), y: this.props.thirtyDayArray[17].confirmed},
                        {x: this.props.thirtyDayArray[18].date.substring(5, this.props.thirtyDayArray[18].date.length), y: this.props.thirtyDayArray[18].confirmed},
                        {x: this.props.thirtyDayArray[19].date.substring(5, this.props.thirtyDayArray[19].date.length), y: this.props.thirtyDayArray[19].confirmed},
                        {x: this.props.thirtyDayArray[20].date.substring(5, this.props.thirtyDayArray[20].date.length), y: this.props.thirtyDayArray[20].confirmed},
                        {x: this.props.thirtyDayArray[21].date.substring(5, this.props.thirtyDayArray[21].date.length), y: this.props.thirtyDayArray[21].confirmed},
                        {x: this.props.thirtyDayArray[22].date.substring(5, this.props.thirtyDayArray[22].date.length), y: this.props.thirtyDayArray[22].confirmed},
                        {x: this.props.thirtyDayArray[23].date.substring(5, this.props.thirtyDayArray[23].date.length), y: this.props.thirtyDayArray[23].confirmed},
                        {x: this.props.thirtyDayArray[24].date.substring(5, this.props.thirtyDayArray[24].date.length), y: this.props.thirtyDayArray[24].confirmed},
                        {x: this.props.thirtyDayArray[25].date.substring(5, this.props.thirtyDayArray[25].date.length), y: this.props.thirtyDayArray[25].confirmed},
                        {x: this.props.thirtyDayArray[26].date.substring(5, this.props.thirtyDayArray[26].date.length), y: this.props.thirtyDayArray[26].confirmed},
                        {x: this.props.thirtyDayArray[27].date.substring(5, this.props.thirtyDayArray[27].date.length), y: this.props.thirtyDayArray[27].confirmed},
                        {x: this.props.thirtyDayArray[28].date.substring(5, this.props.thirtyDayArray[28].date.length), y: this.props.thirtyDayArray[28].confirmed},
                        {x: this.props.thirtyDayArray[29].date.substring(5, this.props.thirtyDayArray[29].date.length), y: this.props.thirtyDayArray[29].confirmed},
                    ]}
                    domain={{
                        y: [0, this.props.maxConfirmed + 50]
                    }}
                    size={6}
                    labels={({ datum }) => `${datum.y} new cases on ${datum.x}`}
                    labelComponent={<VictoryTooltip dy={0}/>}
                />
                </VictoryChart>
            </div>
        )
    }
}

export default VisualizeConfirmed;