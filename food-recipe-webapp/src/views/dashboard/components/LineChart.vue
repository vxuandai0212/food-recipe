<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ totalLongSms, totalShortSms, totalCidEmail, totalNormalEmail, totalFcm, data } = {}) {
      this.chart.setOption({
        xAxis: {
          data: data,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['Email CID', 'Email thường', 'SMS ngắn', 'SMS dài', 'FCM']
        },
        series: [
          {
            name: 'Email CID', itemStyle: {
              normal: {
                color: 'rgb(94, 129, 244)',
                lineStyle: {
                  color: 'rgb(94, 129, 244)',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: totalCidEmail,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'Email thường',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgb(231, 123, 123)',
                lineStyle: {
                  color: 'rgb(231, 123, 123)',
                  width: 2
                }
              }
            },
            data: totalNormalEmail,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: 'SMS ngắn',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgb(109, 214, 151)',
                lineStyle: {
                  color: 'rgb(109, 214, 151)',
                  width: 2
                }
              }
            },
            data: totalShortSms,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: 'SMS dài', itemStyle: {
              normal: {
                color: 'rgb(244, 190, 94)',
                lineStyle: {
                  color: 'rgb(244, 190, 94)',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: totalLongSms,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'FCM',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgb(150, 152, 214)',
                lineStyle: {
                  color: 'rgb(150, 152, 214)',
                  width: 2
                }
              }
            },
            data: totalFcm,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
