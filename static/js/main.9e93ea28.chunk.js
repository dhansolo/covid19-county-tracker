(this["webpackJsonpcovid19-county-tracker"]=this["webpackJsonpcovid19-county-tracker"]||[]).push([[0],{213:function(e,t,a){e.exports=a(214)},214:function(e,t,a){"use strict";a.r(t);var n,d,s=a(44),i=a(45),r=a(73),l=a(48),o=a(47),c=a(0),u=a.n(c),h=a(19),g=a.n(h),m=a(133),y=a.n(m),b=(a(236),a(112)),f=a(114),x=a(349),p=a(347),v=a(350),E=a(344),C=a(11),k=a(345),O=a(195),j=a(352),w=a(37),S=a(346),D=a(351),M=a(197),N=a(200),F=a(199),A=a(196),_=a(198),I=a(201),z=b().subtract(1,"days");d=z.month()+1<10?z.date()<10?z.year()+"-0"+(z.month()+1)+"-0"+z.date():z.year()+"-0"+(z.month()+1)+"-"+z.date():z.date()<10?z.year()+"-"+(z.month()+1)+"-0"+z.date():z.year()+"-"+(z.month()+1)+"-"+z.date();var W=[],H=null,L="County",T=null,U=null,V=null,J=null,Y=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={county:"",state:"",loading:!1,data:null,notFound:!1},n.handleCountyChange=n.handleCountyChange.bind(Object(r.a)(n)),n.handleStateChange=n.handleStateChange.bind(Object(r.a)(n)),n.handleSearchClick=n.handleSearchClick.bind(Object(r.a)(n)),n}return Object(i.a)(a,[{key:"handleCountyChange",value:function(e){e.target.value?this.setState({county:e.target.value,data:null,notFound:!1}):""===e.target.value&&this.setState({county:"",data:null,notFound:!1})}},{key:"handleStateChange",value:function(e){this.setState({state:e.target.value,data:null,notFound:!1})}},{key:"handleSearchClick",value:function(){if(""!==this.state.county&&""!==this.state.state){W=[],this.setState({data:null}),H=null,T=null,U=null,V=null,J=null;var e=0;for(this.setState({county:this.state.county,loading:!0,notFound:!1,data:null});e<30;)z=b().subtract(1+e,"days"),n="",n=z.month()+1<10?z.date()<10?z.year()+"-0"+(z.month()+1)+"-0"+z.date():z.year()+"-0"+(z.month()+1)+"-"+z.date():z.date()<10?z.year()+"-"+(z.month()+1)+"-0"+z.date():z.year()+"-"+(z.month()+1)+"-"+z.date(),this.callAxios(n),e++}}},{key:"callAxios",value:function(e){var t=this,a=this.state.county.toLowerCase();return a.includes("county")?a=a.substring(0,a.indexOf("county")-1):a.includes("borough")?a=a.substring(0,a.indexOf("borough")-1):a.includes("parish")&&(a=a.substring(0,a.indexOf("parish")-1)),y()({method:"GET",url:"https://covid-19-statistics.p.rapidapi.com/reports",headers:{"content-type":"application/octet-stream","x-rapidapi-host":"covid-19-statistics.p.rapidapi.com","x-rapidapi-key":"979c35ee84mshaaafcc5c9267b5dp1ff29cjsn060a23d9a089"},params:{region_province:this.state.state,iso:"USA",region_name:"US",city_name:a,date:e,q:"US "+this.state.state}}).then((function(a){a.data.data.length>0?(e===d&&t.setState({data:a.data.data[0].region.cities[0],notFound:!1}),(a.data.data[0].region.cities[0].confirmed_diff<T||null===T)&&(T=a.data.data[0].region.cities[0].confirmed_diff),(a.data.data[0].region.cities[0].confirmed_diff>V||null===V)&&(V=a.data.data[0].region.cities[0].confirmed_diff),(a.data.data[0].region.cities[0].deaths_diff<U||null===U)&&(U=a.data.data[0].region.cities[0].deaths_diff),(a.data.data[0].region.cities[0].deaths_diff>J||null===J)&&(J=a.data.data[0].region.cities[0].deaths_diff),W.push({date:e,confirmed:a.data.data[0].region.cities[0].confirmed_diff,deaths:a.data.data[0].region.cities[0].deaths_diff}),W.sort((function(e,t){return new Date(e.date)-new Date(t.date)})),30===W.length&&t.setState({loading:!1})):t.setState({data:null,notFound:!0,loading:!1})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){this.state.data&&!this.state.loading&&(H=u.a.createElement(R,{confirmed:this.state.data.confirmed,deaths:this.state.data.deaths,county:this.state.data.name,state:this.state.state,minConfirmed:T,minDeaths:U,maxConfirmed:V,maxDeaths:J}));var e=null,t=null;return this.state.loading&&(e=u.a.createElement(Z,{id:"loading"})),this.state.notFound&&(t=u.a.createElement(P,null)),u.a.createElement("div",null,u.a.createElement("div",{class:"search"},u.a.createElement(x.a,{id:"search-county",type:"text",label:"County",variant:"filled",value:this.state.county,onChange:this.handleCountyChange}),u.a.createElement(E.a,{variant:"filled",id:"search-state"},u.a.createElement(v.a,null,"State"),u.a.createElement(p.a,{type:"text",value:this.state.state,onChange:this.handleStateChange},u.a.createElement(C.a,{value:"Alabama"},"Alabama"),u.a.createElement(C.a,{value:"Alaska"},"Alaska"),u.a.createElement(C.a,{value:"Arizona"},"Arizona"),u.a.createElement(C.a,{value:"Arkansas"},"Arkansas"),u.a.createElement(C.a,{value:"California"},"California"),u.a.createElement(C.a,{value:"Colorado"},"Colorado"),u.a.createElement(C.a,{value:"Connecticut"},"Connecticut"),u.a.createElement(C.a,{value:"Delaware"},"Delaware"),u.a.createElement(C.a,{value:"Florida"},"Florida"),u.a.createElement(C.a,{value:"Georgia"},"Georgia"),u.a.createElement(C.a,{value:"Hawaii"},"Hawaii"),u.a.createElement(C.a,{value:"Idaho"},"Idaho"),u.a.createElement(C.a,{value:"Illinois"},"Illinois"),u.a.createElement(C.a,{value:"Indiana"},"Indiana"),u.a.createElement(C.a,{value:"Iowa"},"Iowa"),u.a.createElement(C.a,{value:"Kansas"},"Kansas"),u.a.createElement(C.a,{value:"Kentucky"},"Kentucky"),u.a.createElement(C.a,{value:"Louisiana"},"Louisiana"),u.a.createElement(C.a,{value:"Maine"},"Maine"),u.a.createElement(C.a,{value:"Maryland"},"Maryland"),u.a.createElement(C.a,{value:"Massachusetts"},"Massachusetts"),u.a.createElement(C.a,{value:"Michigan"},"Michigan"),u.a.createElement(C.a,{value:"Minnesota"},"Minnesota"),u.a.createElement(C.a,{value:"Mississippi"},"Mississippi"),u.a.createElement(C.a,{value:"Missouri"},"Missouri"),u.a.createElement(C.a,{value:"Montana"},"Montana"),u.a.createElement(C.a,{value:"Nebraska"},"Nebraska"),u.a.createElement(C.a,{value:"Nevada"},"Nevada"),u.a.createElement(C.a,{value:"New Hampshire"},"New Hampshire"),u.a.createElement(C.a,{value:"New Jersey"},"New Jersey"),u.a.createElement(C.a,{value:"New Mexico"},"New Mexico"),u.a.createElement(C.a,{value:"New York"},"New York"),u.a.createElement(C.a,{value:"North Carolina"},"North Carolina"),u.a.createElement(C.a,{value:"North Dakota"},"North Dakota"),u.a.createElement(C.a,{value:"Ohio"},"Ohio"),u.a.createElement(C.a,{value:"Oklahoma"},"Oklahoma"),u.a.createElement(C.a,{value:"Oregon"},"Oregon"),u.a.createElement(C.a,{value:"Pennsylvania"},"Pennsylvania"),u.a.createElement(C.a,{value:"Rhode Island"},"Rhode Island"),u.a.createElement(C.a,{value:"South Carolina"},"South Carolina"),u.a.createElement(C.a,{value:"South Dakota"},"South Dakota"),u.a.createElement(C.a,{value:"Tennessee"},"Tennessee"),u.a.createElement(C.a,{value:"Texas"},"Texas"),u.a.createElement(C.a,{value:"Utah"},"Utah"),u.a.createElement(C.a,{value:"Vermont"},"Vermont"),u.a.createElement(C.a,{value:"Virginia"},"Virginia"),u.a.createElement(C.a,{value:"Washington"},"Washington"),u.a.createElement(C.a,{value:"West Virginia"},"West Virginia"),u.a.createElement(C.a,{value:"Wisconsin"},"Wisconsin"),u.a.createElement(C.a,{value:"Wyoming"},"Wyoming"))),u.a.createElement(k.a,{id:"search-button",variant:"contained",color:"secondary",onClick:this.handleSearchClick},"Search")),u.a.createElement(w.a,{id:"date-chip",label:"Data as of "+b().subtract(1,"days").format("MMMM DD, YYYY")}),u.a.createElement("div",{id:"result"},H,e,t))}}]),a}(u.a.Component),R=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props.deaths/this.props.confirmed*100;return"Alaska"===this.props.state&&(L="Borough"),"Louisiana"===this.props.state&&(L="Parish"),u.a.createElement("div",null,u.a.createElement(f.a,{container:!0,justify:"center"},u.a.createElement("div",{class:"info"},u.a.createElement("h3",null,"Statistics for ",this.props.county," ",L,", ",this.props.state),u.a.createElement(w.a,{id:"county-confirmed",label:"Confirmed: "+this.props.confirmed}),u.a.createElement(w.a,{id:"county-deaths",label:"Fatalities: "+this.props.deaths}),u.a.createElement(w.a,{id:"county-rate",label:"Approximate Fatality Rate: "+e.toFixed(3)+"%"}))),u.a.createElement(f.a,{container:!0,justify:"center"},u.a.createElement(O.a,{id:"visualize-confirmed",variant:"elevation",elevation:24},u.a.createElement(G,{county:this.props.county,minConfirmed:this.props.minConfirmed,maxConfirmed:this.props.maxConfirmed})),u.a.createElement(O.a,{id:"visualize-deaths",variant:"elevation",elevation:24},u.a.createElement(K,{county:this.props.county,minDeaths:this.props.minDeaths,maxDeaths:this.props.maxDeaths}))))}}]),a}(u.a.Component),G=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return u.a.createElement("div",null,u.a.createElement(M.a,{containerComponent:u.a.createElement(N.a,{zoomDimension:"x",zoomDomain:{x:[22,30]},allowZoom:!1})},u.a.createElement(F.a,{text:"Changes in Confirmed cases Over 30 days for "+this.props.county+" "+L,x:225,y:30,textAnchor:"middle"}),u.a.createElement(A.a,{name:"dates",interpolation:"natural",style:{data:{stroke:"#c43a31"},parent:{border:"1px solid black",width:"10%"}},data:[{x:W[0].date.substring(5,W[0].date.length),y:W[0].confirmed},{x:W[1].date.substring(5,W[1].date.length),y:W[1].confirmed},{x:W[2].date.substring(5,W[2].date.length),y:W[2].confirmed},{x:W[3].date.substring(5,W[3].date.length),y:W[3].confirmed},{x:W[4].date.substring(5,W[4].date.length),y:W[4].confirmed},{x:W[5].date.substring(5,W[5].date.length),y:W[5].confirmed},{x:W[6].date.substring(5,W[6].date.length),y:W[6].confirmed},{x:W[7].date.substring(5,W[7].date.length),y:W[7].confirmed},{x:W[8].date.substring(5,W[8].date.length),y:W[8].confirmed},{x:W[9].date.substring(5,W[9].date.length),y:W[9].confirmed},{x:W[10].date.substring(5,W[10].date.length),y:W[10].confirmed},{x:W[11].date.substring(5,W[11].date.length),y:W[11].confirmed},{x:W[12].date.substring(5,W[12].date.length),y:W[12].confirmed},{x:W[13].date.substring(5,W[13].date.length),y:W[13].confirmed},{x:W[14].date.substring(5,W[14].date.length),y:W[14].confirmed},{x:W[15].date.substring(5,W[15].date.length),y:W[15].confirmed},{x:W[16].date.substring(5,W[16].date.length),y:W[16].confirmed},{x:W[17].date.substring(5,W[17].date.length),y:W[17].confirmed},{x:W[18].date.substring(5,W[18].date.length),y:W[18].confirmed},{x:W[19].date.substring(5,W[19].date.length),y:W[19].confirmed},{x:W[20].date.substring(5,W[20].date.length),y:W[20].confirmed},{x:W[21].date.substring(5,W[21].date.length),y:W[21].confirmed},{x:W[22].date.substring(5,W[22].date.length),y:W[22].confirmed},{x:W[23].date.substring(5,W[23].date.length),y:W[23].confirmed},{x:W[24].date.substring(5,W[24].date.length),y:W[24].confirmed},{x:W[25].date.substring(5,W[25].date.length),y:W[25].confirmed},{x:W[26].date.substring(5,W[26].date.length),y:W[26].confirmed},{x:W[27].date.substring(5,W[27].date.length),y:W[27].confirmed},{x:W[28].date.substring(5,W[28].date.length),y:W[28].confirmed},{x:W[29].date.substring(5,W[29].date.length),y:W[29].confirmed}],animate:{duration:2e3,opacity:0,onLoad:{duration:1e3,opacity:1}},domain:{y:[0,this.props.maxConfirmed+50]}}),u.a.createElement(_.a,{data:[{x:W[0].date.substring(5,W[0].date.length),y:W[0].confirmed},{x:W[1].date.substring(5,W[1].date.length),y:W[1].confirmed},{x:W[2].date.substring(5,W[2].date.length),y:W[2].confirmed},{x:W[3].date.substring(5,W[3].date.length),y:W[3].confirmed},{x:W[4].date.substring(5,W[4].date.length),y:W[4].confirmed},{x:W[5].date.substring(5,W[5].date.length),y:W[5].confirmed},{x:W[6].date.substring(5,W[6].date.length),y:W[6].confirmed},{x:W[7].date.substring(5,W[7].date.length),y:W[7].confirmed},{x:W[8].date.substring(5,W[8].date.length),y:W[8].confirmed},{x:W[9].date.substring(5,W[9].date.length),y:W[9].confirmed},{x:W[10].date.substring(5,W[10].date.length),y:W[10].confirmed},{x:W[11].date.substring(5,W[11].date.length),y:W[11].confirmed},{x:W[12].date.substring(5,W[12].date.length),y:W[12].confirmed},{x:W[13].date.substring(5,W[13].date.length),y:W[13].confirmed},{x:W[14].date.substring(5,W[14].date.length),y:W[14].confirmed},{x:W[15].date.substring(5,W[15].date.length),y:W[15].confirmed},{x:W[16].date.substring(5,W[16].date.length),y:W[16].confirmed},{x:W[17].date.substring(5,W[17].date.length),y:W[17].confirmed},{x:W[18].date.substring(5,W[18].date.length),y:W[18].confirmed},{x:W[19].date.substring(5,W[19].date.length),y:W[19].confirmed},{x:W[20].date.substring(5,W[20].date.length),y:W[20].confirmed},{x:W[21].date.substring(5,W[21].date.length),y:W[21].confirmed},{x:W[22].date.substring(5,W[22].date.length),y:W[22].confirmed},{x:W[23].date.substring(5,W[23].date.length),y:W[23].confirmed},{x:W[24].date.substring(5,W[24].date.length),y:W[24].confirmed},{x:W[25].date.substring(5,W[25].date.length),y:W[25].confirmed},{x:W[26].date.substring(5,W[26].date.length),y:W[26].confirmed},{x:W[27].date.substring(5,W[27].date.length),y:W[27].confirmed},{x:W[28].date.substring(5,W[28].date.length),y:W[28].confirmed},{x:W[29].date.substring(5,W[29].date.length),y:W[29].confirmed}],domain:{y:[0,this.props.maxConfirmed+50]},size:6,labels:function(e){var t=e.datum;return"".concat(t.y)},labelComponent:u.a.createElement(I.a,{dy:0})})))}}]),a}(u.a.Component),K=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return u.a.createElement("div",null,u.a.createElement(M.a,{containerComponent:u.a.createElement(N.a,{zoomDimension:"x",zoomDomain:{x:[22,30]},allowZoom:!1})},u.a.createElement(F.a,{text:"Number of Fatalities Over 30 days for "+this.props.county+" "+L,x:225,y:30,textAnchor:"middle"}),u.a.createElement(A.a,{interpolation:"natural",style:{data:{stroke:"#c43a31"},parent:{border:"1px solid black",width:"10%"}},data:[{x:W[0].date.substring(5,W[0].date.length),y:W[0].deaths},{x:W[1].date.substring(5,W[1].date.length),y:W[1].deaths},{x:W[2].date.substring(5,W[2].date.length),y:W[2].deaths},{x:W[3].date.substring(5,W[3].date.length),y:W[3].deaths},{x:W[4].date.substring(5,W[4].date.length),y:W[4].deaths},{x:W[5].date.substring(5,W[5].date.length),y:W[5].deaths},{x:W[6].date.substring(5,W[6].date.length),y:W[6].deaths},{x:W[7].date.substring(5,W[7].date.length),y:W[7].deaths},{x:W[8].date.substring(5,W[8].date.length),y:W[8].deaths},{x:W[9].date.substring(5,W[9].date.length),y:W[9].deaths},{x:W[10].date.substring(5,W[10].date.length),y:W[10].deaths},{x:W[11].date.substring(5,W[11].date.length),y:W[11].deaths},{x:W[12].date.substring(5,W[12].date.length),y:W[12].deaths},{x:W[13].date.substring(5,W[13].date.length),y:W[13].deaths},{x:W[14].date.substring(5,W[14].date.length),y:W[14].deaths},{x:W[15].date.substring(5,W[15].date.length),y:W[15].deaths},{x:W[16].date.substring(5,W[16].date.length),y:W[16].deaths},{x:W[17].date.substring(5,W[17].date.length),y:W[17].deaths},{x:W[18].date.substring(5,W[18].date.length),y:W[18].deaths},{x:W[19].date.substring(5,W[19].date.length),y:W[19].deaths},{x:W[20].date.substring(5,W[20].date.length),y:W[20].deaths},{x:W[21].date.substring(5,W[21].date.length),y:W[21].deaths},{x:W[22].date.substring(5,W[22].date.length),y:W[22].deaths},{x:W[23].date.substring(5,W[23].date.length),y:W[23].deaths},{x:W[24].date.substring(5,W[24].date.length),y:W[24].deaths},{x:W[25].date.substring(5,W[25].date.length),y:W[25].deaths},{x:W[26].date.substring(5,W[26].date.length),y:W[26].deaths},{x:W[27].date.substring(5,W[27].date.length),y:W[27].deaths},{x:W[28].date.substring(5,W[28].date.length),y:W[28].deaths},{x:W[29].date.substring(5,W[29].date.length),y:W[29].deaths}],animate:{duration:2e3,opacity:0,onLoad:{duration:1e3,opacity:1}},domain:{y:[0,this.props.maxDeaths]}}),u.a.createElement(_.a,{data:[{x:W[0].date.substring(5,W[0].date.length),y:W[0].deaths},{x:W[1].date.substring(5,W[1].date.length),y:W[1].deaths},{x:W[2].date.substring(5,W[2].date.length),y:W[2].deaths},{x:W[3].date.substring(5,W[3].date.length),y:W[3].deaths},{x:W[4].date.substring(5,W[4].date.length),y:W[4].deaths},{x:W[5].date.substring(5,W[5].date.length),y:W[5].deaths},{x:W[6].date.substring(5,W[6].date.length),y:W[6].deaths},{x:W[7].date.substring(5,W[7].date.length),y:W[7].deaths},{x:W[8].date.substring(5,W[8].date.length),y:W[8].deaths},{x:W[9].date.substring(5,W[9].date.length),y:W[9].deaths},{x:W[10].date.substring(5,W[10].date.length),y:W[10].deaths},{x:W[11].date.substring(5,W[11].date.length),y:W[11].deaths},{x:W[12].date.substring(5,W[12].date.length),y:W[12].deaths},{x:W[13].date.substring(5,W[13].date.length),y:W[13].deaths},{x:W[14].date.substring(5,W[14].date.length),y:W[14].deaths},{x:W[15].date.substring(5,W[15].date.length),y:W[15].deaths},{x:W[16].date.substring(5,W[16].date.length),y:W[16].deaths},{x:W[17].date.substring(5,W[17].date.length),y:W[17].deaths},{x:W[18].date.substring(5,W[18].date.length),y:W[18].deaths},{x:W[19].date.substring(5,W[19].date.length),y:W[19].deaths},{x:W[20].date.substring(5,W[20].date.length),y:W[20].deaths},{x:W[21].date.substring(5,W[21].date.length),y:W[21].deaths},{x:W[22].date.substring(5,W[22].date.length),y:W[22].deaths},{x:W[23].date.substring(5,W[23].date.length),y:W[23].deaths},{x:W[24].date.substring(5,W[24].date.length),y:W[24].deaths},{x:W[25].date.substring(5,W[25].date.length),y:W[25].deaths},{x:W[26].date.substring(5,W[26].date.length),y:W[26].deaths},{x:W[27].date.substring(5,W[27].date.length),y:W[27].deaths},{x:W[28].date.substring(5,W[28].date.length),y:W[28].deaths},{x:W[29].date.substring(5,W[29].date.length),y:W[29].deaths}],animate:{duration:2e3,opacity:0,onLoad:{duration:1e3,opacity:1}},domain:{y:[0,this.props.maxDeaths]},size:6,labels:function(e){var t=e.datum;return"".concat(t.y)},labelComponent:u.a.createElement(I.a,{dy:0})})))}}]),a}(u.a.Component),P=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return u.a.createElement("div",{class:"info"},u.a.createElement("p",null,"No data found, are you sure you entered the correct County and State?"),u.a.createElement("p",null,"Please note that data from John Hopkins University may contain some discrepencies."))}}]),a}(u.a.Component),B=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={data:null,loading:!0},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;y()({method:"GET",url:"https://covid-19-statistics.p.rapidapi.com/reports/total",headers:{"content-type":"application/octet-stream","x-rapidapi-host":"covid-19-statistics.p.rapidapi.com","x-rapidapi-key":"979c35ee84mshaaafcc5c9267b5dp1ff29cjsn060a23d9a089"},params:{date:d}}).then((function(t){e.setState({data:t.data.data,loading:!1})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e,t;return this.state.loading&&(t=u.a.createElement(Z,null)),this.state.data&&(e=u.a.createElement(Q,{data:this.state.data})),u.a.createElement("div",null,t,e)}}]),a}(u.a.Component),Z=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return u.a.createElement(S.a,null)}}]),a}(u.a.Component);function q(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}var Q=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=100*this.props.data.fatality_rate;return u.a.createElement("div",null,u.a.createElement("h3",null,"World Statistics"),u.a.createElement("p",null,u.a.createElement(w.a,{id:"world-confirmed",label:"Confirmed: "+q(this.props.data.confirmed)}),u.a.createElement(w.a,{id:"world-recovered",label:"Recovered: "+q(this.props.data.recovered)}),u.a.createElement(w.a,{id:"world-deaths",label:"Fatalities: "+q(this.props.data.deaths)}),u.a.createElement(w.a,{id:"world-rate",label:"Approximate Fatality Rate: "+e.toFixed(3)+"%"})))}}]),a}(u.a.Component);function X(){return u.a.createElement(f.a,{container:!0,justify:"center"},u.a.createElement(f.a,{item:!0,xs:12},u.a.createElement("div",{class:"main"},u.a.createElement("div",{class:"headers"},u.a.createElement("h1",null,"COVID-19 County Tracker")),u.a.createElement("header",{class:"world-data"},u.a.createElement(B,null)),u.a.createElement("div",{class:"search"},u.a.createElement(Y,null)),u.a.createElement("footer",null,u.a.createElement(D.a,{href:"https://www.linkedin.com/in/davidhan93/"},u.a.createElement(w.a,{id:"chip",avatar:u.a.createElement(j.a,null,"DH"),label:"Created by David Han",clickable:!0})),u.a.createElement(w.a,{id:"chip",label:"Data provided by John Hopkins University"})))))}g.a.render(u.a.createElement(X,null),document.getElementById("root"))},236:function(e,t,a){}},[[213,1,2]]]);
//# sourceMappingURL=main.9e93ea28.chunk.js.map