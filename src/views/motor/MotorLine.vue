<script setup lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import type { MotorData } from '@/stores/useAppStore'
  import { LineChart } from 'echarts/charts'
  import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { defineProps, onBeforeUnmount, onMounted, provide, ref, watchEffect } from 'vue'
  import VChart, { THEME_KEY } from 'vue-echarts'

  // 引入 ECharts 组件
  use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent])

  // 提供主题
  provide(THEME_KEY, 'light')

  // 定义接收的 props
  const props = defineProps<{
    motor0Data: MotorData
    motor1Data: MotorData
  }>()

  // 控制折线显示的变量
  const showMotor0Speed = ref(true)
  const showMotor1Speed = ref(true)
  const showMotor0Position = ref(true)
  const showMotor1Position = ref(true)

  // 初始化数据数组
  const motor0SpeedData = ref<Array<[number, number]>>([[new Date().getTime(), 0]])

  const motor1SpeedData = ref<Array<[number, number]>>([[new Date().getTime(), 0]])

  const motor0PositionData = ref<Array<[number, number]>>([[new Date().getTime(), 0]])

  const motor1PositionData = ref<Array<[number, number]>>([[new Date().getTime(), 0]])

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
      data: ['Motor 0 Speed', 'Motor 1 Speed', 'Motor 0 Position', 'Motor 1 Position'],
      top: '10%',
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Speed',
        position: 'left',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
          lineStyle: {
            color: '#d0d',
            type: 'dashed',
          },
        },
      },
      {
        type: 'value',
        name: 'Position',
        position: 'right',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ddd',
            type: 'dashed',
          },
        },
      },
    ],
    series: [
      {
        name: 'Motor 0 Speed',
        type: 'line',
        showSymbol: false,
        data: motor0SpeedData.value,
        smooth: true,
        lineStyle: {
          color: '#5470C6',
        },
        yAxisIndex: 0,
        // 根据 showMotor0 控制是否显示
        show: showMotor0Speed.value,
      },
      {
        name: 'Motor 1 Speed',
        type: 'line',
        showSymbol: false,
        data: motor1SpeedData.value,
        smooth: true,
        lineStyle: {
          color: '#EE6666',
        },
        yAxisIndex: 0,
        // 根据 showMotor1 控制是否显示
        show: showMotor1Speed.value,
      },
      {
        name: 'Motor 0 Position',
        type: 'line',
        showSymbol: false,
        data: motor0PositionData.value,
        smooth: true,
        lineStyle: {
          color: '#54E0C6',
        },
        yAxisIndex: 1,
        // 根据 showMotor1 控制是否显示
        show: showMotor0Position.value,
      },
      {
        name: 'Motor 1 Position',
        type: 'line',
        showSymbol: false,
        data: motor1PositionData.value,
        smooth: true,
        lineStyle: {
          color: '#2E6066',
        },
        yAxisIndex: 1,
        // 根据 showMotor1 控制是否显示
        show: showMotor1Position.value,
      },
    ],
  })

  // 最大数据点数
  const MAX_DATA_POINTS = 100

  // 定时器 ID
  let intervalId: number

  // 定时更新函数
  const updateChartData = () => {
    const date = new Date().getTime()

    motor0SpeedData.value.push([date, props.motor0Data.speed])
    // 保持数据点不超过 MAX_DATA_POINTS 个
    if (motor0SpeedData.value.length > MAX_DATA_POINTS) {
      motor0SpeedData.value.shift()
    }

    motor1SpeedData.value.push([date, props.motor1Data.speed])
    // 保持数据点不超过 MAX_DATA_POINTS 个
    if (motor1SpeedData.value.length > MAX_DATA_POINTS) {
      motor1SpeedData.value.shift()
    }

    motor0PositionData.value.push([date, props.motor0Data.position])
    // 保持数据点不超过 MAX_DATA_POINTS 个
    if (motor0PositionData.value.length > MAX_DATA_POINTS) {
      motor0PositionData.value.shift()
    }

    motor1PositionData.value.push([date, props.motor1Data.position])
    // 保持数据点不超过 MAX_DATA_POINTS 个
    if (motor1PositionData.value.length > MAX_DATA_POINTS) {
      motor1PositionData.value.shift()
    }

    // 更新图表数据
    option.value.series[0].data = motor0SpeedData.value
    option.value.series[1].data = motor1SpeedData.value
    option.value.series[2].data = motor0PositionData.value
    option.value.series[3].data = motor1PositionData.value
  }

  // 启动定时器
  onMounted(() => {
    intervalId = window.setInterval(updateChartData, 1000) // 每秒更新一次
  })

  // 清理定时器
  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  watchEffect(() => {
    option.value.series[0].show = showMotor0Speed.value
    option.value.series[1].show = showMotor1Speed.value
    option.value.series[2].show = showMotor0Position.value
    option.value.series[3].show = showMotor1Position.value
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