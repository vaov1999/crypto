(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{364:function(t,e,r){var content=r(389);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(129).default)("c79f3d22",content,!0,{sourceMap:!1})},388:function(t,e,r){"use strict";r(364)},389:function(t,e,r){var n=r(128)(!1);n.push([t.i,".trade-list[data-v-546223ea]{width:100%;height:100%;background-color:#fff}",""]),t.exports=n},420:function(t,e,r){"use strict";r.r(e);var n={name:"Chart",props:{chartData:{type:Object,default:function(){return!1}}},watch:{chartData:function(t,e){this.initChart(t)}},mounted:function(){this.initChart(!1)},methods:{initChart:function(t){var e,r=this.$amchart(),n=r.am4core,o=r.am4charts,c=n.create(this.$refs.chartdiv,o.XYChart);c.paddingRight=20;var l=[];((null==t||null===(e=t.Data)||void 0===e?void 0:e.Data)||this.chartData.Data.Data).forEach((function(t){l.push({date:new Date(t.time),name:"".concat(t.time),value:t.high})})),console.log("GRAPHIC",l),c.data=l,c.xAxes.push(new o.DateAxis).renderer.grid.template.location=0;var h=c.yAxes.push(new o.ValueAxis);h.tooltip.disabled=!0,h.renderer.minWidth=35;var d=c.series.push(new o.LineSeries);d.dataFields.dateX="date",d.dataFields.valueY="value",d.tooltipText="{valueY.value}",c.cursor=new o.XYCursor;var f=new o.XYChartScrollbar;f.series.push(d),c.scrollbarX=f,this.chart=c}}},o=(r(388),r(83)),component=Object(o.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chartdiv",staticClass:"trade-list"})}),[],!1,null,"546223ea",null);e.default=component.exports}}]);