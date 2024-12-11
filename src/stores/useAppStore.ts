import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface MotorData {
  speed: number
  torque: number
  inputVoltage: number
  inputCurrent: number

  workMode: string
  hillAssists: string
  mcuStatus: string
  faultCode: string
  faultLevel: string
  softwareVersion: string
  mcuTemperature: number
  motorTemperature: number

  position: number
  mechanicalPosition: number
}

export const useAppStore = defineStore('app', () => {
  const deviceStatus = ref(false)
  const channel0Status = ref(false)
  const channel1Status = ref(false)

  const motor0Status = ref(false)
  const motor1Status = ref(false)

  const motor0Data = ref<MotorData>({
    speed: 0,
    torque: 0,
    inputVoltage: 0,
    inputCurrent: 0,
    workMode: '',
    hillAssists: '',
    mcuStatus: '',
    faultCode: '',
    faultLevel: '',
    softwareVersion: '',
    mcuTemperature: 0,
    motorTemperature: 0,
    position: 0,
    mechanicalPosition: 0,
  })
  const motor1Data = ref<MotorData>({
    speed: 0,
    torque: 0,
    inputVoltage: 0,
    inputCurrent: 0,
    workMode: '',
    hillAssists: '',
    mcuStatus: '',
    faultCode: '',
    faultLevel: '',
    softwareVersion: '',
    mcuTemperature: 0,
    motorTemperature: 0,
    position: 0,
    mechanicalPosition: 0,
  })

  return { deviceStatus, channel0Status, channel1Status, motor0Status, motor1Status, motor0Data, motor1Data }
})