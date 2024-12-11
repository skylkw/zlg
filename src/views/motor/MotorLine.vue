<script setup lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import type { MotorData } from '@/stores/useAppStore'
  import { LineChart } from 'echarts/charts'
  import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { defineProps, provide, ref, watchEffect } from 'vue'
  import VChart, { THEME_KEY } from 'vue-echarts'

  // 引入 ECharts 组件
  use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent])

  // 提供主题
  provide(THEME_KEY, 'light')

  // 定义接收的 props
  const props = defineProps<{
    motor0Data?: MotorData
    motor1Data?: MotorData
  }>()

  // 控制折线显示的变量
  const showMotor0 = ref(true)
  const showMotor1 = ref(true)

  // 初始化数据数组
  const data0 = ref<Array<[number, number]>>([[new Date().getTime(), 0]])

  const data1 = ref<Array<[number, number]>>([[new Date().getTime(), 0]])

  // 定义 ECharts 配置项
  const option = ref({
    title: {
      text: '电机数据折线图',
      left: 'center',
    },
    // tooltip: {
    //   trigger: 'axis',
    //   formatter: function (params: any) {
    //     if (params.length === 0) return ''

    //     let tooltipText = ''
    //     params.forEach((param: any) => {
    //       const dataPoint = param.data as [number, number]
    //       const date = new Date(dataPoint[0])
    //       tooltipText += `
    //       <div>
    //         <strong>${param.seriesName}</strong><br/>
    //         ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
    //         2,
    //         '0'
    //       )}
    //         ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    //         date.getSeconds()
    //       ).padStart(2, '0')}
    //         : ${dataPoint[1]}
    //       </div>
    //     `
    //     })
    //     return tooltipText
    //   },
    //   axisPointer: {
    //     animation: false,
    //   },
    // },
    legend: {
      data: ['Motor 0', 'Motor 1'],
      top: '10%',
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Motor 0',
        type: 'line',
        showSymbol: false,
        data: data0.value,
        smooth: true,
        lineStyle: {
          color: '#5470C6',
        },
        // 根据 showMotor0 控制是否显示
        show: showMotor0.value,
      },
      {
        name: 'Motor 1',
        type: 'line',
        showSymbol: false,
        data: data1.value,
        smooth: true,
        lineStyle: {
          color: '#EE6666',
        },
        // 根据 showMotor1 控制是否显示
        show: showMotor1.value,
      },
    ],
  })

  // 最大数据点数
  const MAX_DATA_POINTS = 100

  // 监听 motor0Data 和 motor1Data 的变化并更新图表
  watchEffect(() => {
    const date = new Date().getTime()
    if (props.motor0Data?.speed) {
      data0.value.push([date, props.motor0Data.speed])
      // 保持数据点不超过 MAX_DATA_POINTS 个
      if (data0.value.length > MAX_DATA_POINTS) {
        data0.value.shift()
      }
    }

    if (props.motor1Data?.speed) {
      data1.value.push([date, props.motor1Data.speed])
      // 保持数据点不超过 MAX_DATA_POINTS 个
      if (data1.value.length > MAX_DATA_POINTS) {
        data1.value.shift()
      }
    }

    // 更新图表数据
    option.value.series[0].data = data0.value
    option.value.series[1].data = data1.value
    option.value.series[0].show = showMotor0.value
    option.value.series[1].show = showMotor1.value
  })
</script>

<template>
  <Card class="col-span-1 lg:col-span-2">
    <CardHeader>
      <CardTitle>折线图</CardTitle>
    </CardHeader>
    <CardContent>
      <v-chart class="min-h-96" :option="option" autoresize />
    </CardContent>
  </Card>
</template>