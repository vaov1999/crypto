import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4themesDark from '@amcharts/amcharts4/themes/dark'
import Vue from 'vue'
Vue.prototype.$amchart = () => {
  return {
    am4core,
    am4charts,
    am4themesAnimated,
    am4themesDark,
  }
}
