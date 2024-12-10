import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const deviceStatus = ref(false)
  const channel0Status = ref(false)
  const channel1Status = ref(false)

  const motor0Status = ref(false)
  const motor1Status = ref(false)

  const motor0Data = ref()
  const motor1Data = ref()

  return { deviceStatus, channel0Status, channel1Status, motor0Status, motor1Status, motor0Data, motor1Data }
})