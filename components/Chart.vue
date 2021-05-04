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
  watch: {
    chartData(newChart, oldChart) {
      this.initChart(newChart)
    },
  },
  mounted() {
    this.initChart(false)
  },
  methods: {
    initChart(newData) {
      const { am4core, am4charts } = this.$amchart()
      const CHART = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      CHART.paddingRight = 20

      const DATA = []

      const COIN_CHART = newData?.Data?.Data || this.chartData.Data.Data

      COIN_CHART.forEach((item) => {
        DATA.push({
          date: new Date(item.time),
          name: `${item.time}`,
          value: item.high,
        })
      })

      console.log('GRAPHIC', DATA)

      CHART.data = DATA

      const DATE_AXIS = CHART.xAxes.push(new am4charts.DateAxis())
      DATE_AXIS.renderer.grid.template.location = 0

      const VALUE_AXIS = CHART.yAxes.push(new am4charts.ValueAxis())
      VALUE_AXIS.tooltip.disabled = true
      VALUE_AXIS.renderer.minWidth = 35

      const SERIES = CHART.series.push(new am4charts.LineSeries())
      SERIES.dataFields.dateX = 'date'
      SERIES.dataFields.valueY = 'value'

      SERIES.tooltipText = '{valueY.value}'
      CHART.cursor = new am4charts.XYCursor()

      const scrollbarX = new am4charts.XYChartScrollbar()
      scrollbarX.series.push(SERIES)
      CHART.scrollbarX = scrollbarX

      this.chart = CHART
    },
  },
}
</script>

<style scoped lang="sass">
.trade-list
  width: 100%
  height: 100%
  background-color: $white
</style>
