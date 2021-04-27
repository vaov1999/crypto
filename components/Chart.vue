<template>
  <div ref="chartdiv" class="trade-list"></div>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Object,
      default: () => false,
    },
  },
  mounted() {
    const { am4core, am4charts } = this.$amchart()
    console.log('root amcharts', am4core, am4charts)
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    console.log('chart', chart)

    chart.paddingRight = 20

    const data = []
    let visits = 10
    for (let i = 1; i < 7; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDay()
        ),
        name: 'name' + i,
        value: visits,
      })
    }

    console.log('DATA', data)
    console.log('new DATA', new Date())

    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'value'

    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()

    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX

    this.chart = chart
  },
}
</script>

<style scoped lang="sass">
.trade-list
  width: 100%
  height: 100%
  background-color: $white
</style>
