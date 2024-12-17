<script setup lang="ts">
  import { useAppStore } from '@/stores/useAppStore'
  import Motor0Form from './Motor0Form.vue'
  import Motor1Form from './Motor1Form.vue'
  import MotorDisplay from './MotorDisplay.vue'
  import MotorLine from './MotorLine.vue'

  const appStore = useAppStore()
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Motor0Form />
    <Motor1Form />
    <MotorDisplay
      :motorId="0"
      motorLabel="电机0"
      :motorStatus="appStore.motor0Status"
      :motorData="appStore.motor0Data"
      :interval="1000" />
    <MotorDisplay
      :motorId="1"
      motorLabel="电机1"
      :motorStatus="appStore.motor1Status"
      :motorData="appStore.motor1Data"
      :interval="1000" />

    <MotorLine :motor0Data="appStore.motor0Data" :motor1Data="appStore.motor1Data" :interval="1000"/>
  </div>
</template>