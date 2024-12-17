<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MotorData } from '@/stores/useAppStore'
import InfoCard from './InfoCard.vue'

const props = defineProps<{
  motorId: number
  motorLabel: string
  motorStatus: boolean
  motorData: MotorData,
  interval: number
}>()

const displayedMotorData = ref<MotorData>({ ...props.motorData })
let intervalId: number | null = null

const startInterval = () => {
  if (!intervalId) {
    intervalId = window.setInterval(() => {
      displayedMotorData.value = { ...props.motorData }
    }, props.interval)
  }
}

const stopInterval = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  if (props.motorStatus) {
    startInterval()
  }
})

watch(() => props.motorStatus, (newVal) => {
  if (newVal) {
    startInterval()
  } else {
    stopInterval()
  }
})

onUnmounted(() => {
  stopInterval()
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ motorLabel }}状态显示</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <InfoCard label="速度" :value="displayedMotorData.speed + ' RPM'" />
        <InfoCard label="扭矩" :value="displayedMotorData.torque + ' Nm'" />
        <InfoCard label="输入电压" :value="displayedMotorData.inputVoltage + ' V'" />
        <InfoCard label="输入电流" :value="displayedMotorData.inputCurrent + ' A'" />
        <InfoCard label="工作模式" :value="displayedMotorData.workMode" />
        <InfoCard label="爬坡辅助" :value="displayedMotorData.hillAssists" />
        <InfoCard label="MCU 状态" :value="displayedMotorData.mcuStatus" />
        <InfoCard label="故障码" :value="displayedMotorData.faultCode" />
        <InfoCard label="故障级别" :value="displayedMotorData.faultLevel" />
        <InfoCard label="软件版本" :value="displayedMotorData.softwareVersion" />
        <InfoCard label="MCU 温度" :value="displayedMotorData.mcuTemperature + ' °C'" />
        <InfoCard label="电机温度" :value="displayedMotorData.motorTemperature + ' °C'" />
        <InfoCard label="位置" :value="displayedMotorData.position + '°'" />
        <InfoCard label="机械位置" :value="displayedMotorData.mechanicalPosition + '°'" />
      </div>
    </CardContent>
  </Card>
</template>