import React from 'react';

import {VictoryChart, VictoryZoomContainer, VictoryTooltip, VictoryLabel, VictoryLine, VictoryScatter} from 'victory';

let type = 'County';
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', "Sep", 'Oct', 'Nov', 'Dec'];

class VisualizeDeaths extends React.Component {
    render() {
        return(
            <div>
                {/* <p>Number of Fatalities Over 30 Days for {this.props.county} County</p> */}
                <VictoryChart containerComponent={<VictoryZoomContainer zoomDimension="x" zoomDomain={{x:[24,30]}} allowZoom={false}/>}>
                    <VictoryLabel text={"Number of Fatalities Over 30 days for " + this.props.county + " " + type} x={225} y={30} textAnchor="middle"/>
                    <VictoryLine
                        interpolation="cardinal"
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid black", width: "10%"}
                        }}
                        data={[
                            {x: months[parseInt(this.props.thirtyDayArray[0].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[0].date.substring(7, this.props.thirtyDayArray[0].date.length), y: this.props.thirtyDayArray[0].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[1].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[1].date.substring(7, this.props.thirtyDayArray[1].date.length), y: this.props.thirtyDayArray[1].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[2].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[2].date.substring(7, this.props.thirtyDayArray[2].date.length), y: this.props.thirtyDayArray[2].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[3].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[3].date.substring(7, this.props.thirtyDayArray[3].date.length), y: this.props.thirtyDayArray[3].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[4].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[4].date.substring(7, this.props.thirtyDayArray[4].date.length), y: this.props.thirtyDayArray[4].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[5].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[5].date.substring(7, this.props.thirtyDayArray[5].date.length), y: this.props.thirtyDayArray[5].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[6].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[6].date.substring(7, this.props.thirtyDayArray[6].date.length), y: this.props.thirtyDayArray[6].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[7].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[7].date.substring(7, this.props.thirtyDayArray[7].date.length), y: this.props.thirtyDayArray[7].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[8].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[8].date.substring(7, this.props.thirtyDayArray[8].date.length), y: this.props.thirtyDayArray[8].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[9].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[9].date.substring(7, this.props.thirtyDayArray[9].date.length), y: this.props.thirtyDayArray[9].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[10].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[10].date.substring(7, this.props.thirtyDayArray[10].date.length), y: this.props.thirtyDayArray[10].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[11].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[11].date.substring(7, this.props.thirtyDayArray[11].date.length), y: this.props.thirtyDayArray[11].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[12].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[12].date.substring(7, this.props.thirtyDayArray[12].date.length), y: this.props.thirtyDayArray[12].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[13].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[13].date.substring(7, this.props.thirtyDayArray[13].date.length), y: this.props.thirtyDayArray[13].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[14].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[14].date.substring(7, this.props.thirtyDayArray[14].date.length), y: this.props.thirtyDayArray[14].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[15].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[15].date.substring(7, this.props.thirtyDayArray[15].date.length), y: this.props.thirtyDayArray[15].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[16].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[16].date.substring(7, this.props.thirtyDayArray[16].date.length), y: this.props.thirtyDayArray[16].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[17].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[17].date.substring(7, this.props.thirtyDayArray[17].date.length), y: this.props.thirtyDayArray[17].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[18].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[18].date.substring(7, this.props.thirtyDayArray[18].date.length), y: this.props.thirtyDayArray[18].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[19].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[19].date.substring(7, this.props.thirtyDayArray[19].date.length), y: this.props.thirtyDayArray[19].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[20].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[20].date.substring(7, this.props.thirtyDayArray[20].date.length), y: this.props.thirtyDayArray[20].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[21].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[21].date.substring(7, this.props.thirtyDayArray[21].date.length), y: this.props.thirtyDayArray[21].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[22].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[22].date.substring(7, this.props.thirtyDayArray[22].date.length), y: this.props.thirtyDayArray[22].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[23].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[23].date.substring(7, this.props.thirtyDayArray[23].date.length), y: this.props.thirtyDayArray[23].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[24].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[24].date.substring(7, this.props.thirtyDayArray[24].date.length), y: this.props.thirtyDayArray[24].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[25].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[25].date.substring(7, this.props.thirtyDayArray[25].date.length), y: this.props.thirtyDayArray[25].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[26].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[26].date.substring(7, this.props.thirtyDayArray[26].date.length), y: this.props.thirtyDayArray[26].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[27].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[27].date.substring(7, this.props.thirtyDayArray[27].date.length), y: this.props.thirtyDayArray[27].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[28].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[28].date.substring(7, this.props.thirtyDayArray[28].date.length), y: this.props.thirtyDayArray[28].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[29].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[29].date.substring(7, this.props.thirtyDayArray[29].date.length), y: this.props.thirtyDayArray[29].deaths},
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
                            y: [0, this.props.maxDeaths + 5]
                        }}
                    />
                    <VictoryScatter
                        data={[
                            {x: months[parseInt(this.props.thirtyDayArray[0].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[0].date.substring(7, this.props.thirtyDayArray[0].date.length), y: this.props.thirtyDayArray[0].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[1].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[1].date.substring(7, this.props.thirtyDayArray[1].date.length), y: this.props.thirtyDayArray[1].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[2].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[2].date.substring(7, this.props.thirtyDayArray[2].date.length), y: this.props.thirtyDayArray[2].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[3].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[3].date.substring(7, this.props.thirtyDayArray[3].date.length), y: this.props.thirtyDayArray[3].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[4].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[4].date.substring(7, this.props.thirtyDayArray[4].date.length), y: this.props.thirtyDayArray[4].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[5].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[5].date.substring(7, this.props.thirtyDayArray[5].date.length), y: this.props.thirtyDayArray[5].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[6].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[6].date.substring(7, this.props.thirtyDayArray[6].date.length), y: this.props.thirtyDayArray[6].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[7].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[7].date.substring(7, this.props.thirtyDayArray[7].date.length), y: this.props.thirtyDayArray[7].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[8].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[8].date.substring(7, this.props.thirtyDayArray[8].date.length), y: this.props.thirtyDayArray[8].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[9].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[9].date.substring(7, this.props.thirtyDayArray[9].date.length), y: this.props.thirtyDayArray[9].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[10].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[10].date.substring(7, this.props.thirtyDayArray[10].date.length), y: this.props.thirtyDayArray[10].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[11].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[11].date.substring(7, this.props.thirtyDayArray[11].date.length), y: this.props.thirtyDayArray[11].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[12].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[12].date.substring(7, this.props.thirtyDayArray[12].date.length), y: this.props.thirtyDayArray[12].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[13].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[13].date.substring(7, this.props.thirtyDayArray[13].date.length), y: this.props.thirtyDayArray[13].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[14].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[14].date.substring(7, this.props.thirtyDayArray[14].date.length), y: this.props.thirtyDayArray[14].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[15].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[15].date.substring(7, this.props.thirtyDayArray[15].date.length), y: this.props.thirtyDayArray[15].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[16].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[16].date.substring(7, this.props.thirtyDayArray[16].date.length), y: this.props.thirtyDayArray[16].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[17].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[17].date.substring(7, this.props.thirtyDayArray[17].date.length), y: this.props.thirtyDayArray[17].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[18].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[18].date.substring(7, this.props.thirtyDayArray[18].date.length), y: this.props.thirtyDayArray[18].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[19].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[19].date.substring(7, this.props.thirtyDayArray[19].date.length), y: this.props.thirtyDayArray[19].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[20].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[20].date.substring(7, this.props.thirtyDayArray[20].date.length), y: this.props.thirtyDayArray[20].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[21].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[21].date.substring(7, this.props.thirtyDayArray[21].date.length), y: this.props.thirtyDayArray[21].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[22].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[22].date.substring(7, this.props.thirtyDayArray[22].date.length), y: this.props.thirtyDayArray[22].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[23].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[23].date.substring(7, this.props.thirtyDayArray[23].date.length), y: this.props.thirtyDayArray[23].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[24].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[24].date.substring(7, this.props.thirtyDayArray[24].date.length), y: this.props.thirtyDayArray[24].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[25].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[25].date.substring(7, this.props.thirtyDayArray[25].date.length), y: this.props.thirtyDayArray[25].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[26].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[26].date.substring(7, this.props.thirtyDayArray[26].date.length), y: this.props.thirtyDayArray[26].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[27].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[27].date.substring(7, this.props.thirtyDayArray[27].date.length), y: this.props.thirtyDayArray[27].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[28].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[28].date.substring(7, this.props.thirtyDayArray[28].date.length), y: this.props.thirtyDayArray[28].deaths},
                            {x: months[parseInt(this.props.thirtyDayArray[29].date.substring(6, 7) - 1)] + "" + this.props.thirtyDayArray[29].date.substring(7, this.props.thirtyDayArray[29].date.length), y: this.props.thirtyDayArray[29].deaths},
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
                            y: [0, this.props.maxDeaths + 5]
                        }}
                        size={6}
                        labels={({ datum }) => `${datum.y} fatalities on ${datum.x}`}
                        labelComponent={<VictoryTooltip dy={0}/>}
                    />
                </VictoryChart>
            </div>
        )
    }
}

export default VisualizeDeaths;