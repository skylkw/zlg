<script setup lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import type { MotorData } from '@/stores/useAppStore'
  import InfoCard from './InfoCard.vue'

  defineProps<{
    motorId: number
    motorLabel: string
    motorStatus: boolean
    motorData: MotorData
  }>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ motorLabel }}状态显示</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <InfoCard label="速度" :value="motorData.speed + ' RPM'" />
        <InfoCard label="扭矩" :value="motorData.torque + ' Nm'" />
        <InfoCard label="输入电压" :value="motorData.inputVoltage + ' V'" />
        <InfoCard label="输入电流" :value="motorData.inputCurrent + ' A'" />
        <InfoCard label="工作模式" :value="motorData.workMode" />
        <InfoCard label="爬坡辅助" :value="motorData.hillAssists" />
        <InfoCard label="MCU 状态" :value="motorData.mcuStatus" />
        <InfoCard label="故障码" :value="motorData.faultCode" />
        <InfoCard label="故障级别" :value="motorData.faultLevel" />
        <InfoCard label="软件版本" :value="motorData.softwareVersion" />
        <InfoCard label="MCU 温度" :value="motorData.mcuTemperature + ' °C'" />
        <InfoCard label="电机温度" :value="motorData.motorTemperature + ' °C'" />
        <InfoCard label="位置" :value="motorData.position + '°'" />
        <InfoCard label="机械位置" :value="motorData.mechanicalPosition + '°'" />
      </div>
    </CardContent>
  </Card>
</template>