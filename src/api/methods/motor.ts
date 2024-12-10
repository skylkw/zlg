import { alovaInstance } from '..'

export interface SetMotorSpeedRequest {
  mode: number // 0: FREE 1: 扭矩 2: 速度
  value: number
  gear: number // 0: N 1: R 2: D
}

// 打开设备
export const enableMotor = (motorIndex: number) => {
  switch (motorIndex) {
    case 0:
      return alovaInstance.Post('/enable_motor_0')
    case 1:
      return alovaInstance.Post('/enable_motor_1')
    default:
      throw new Error('无效的电机索引')
  }
}

// 关闭设备
export const disableMotor = (motorIndex: number) => {
  switch (motorIndex) {
    case 0:
      return alovaInstance.Post('/disable_motor_0')
    case 1:
      return alovaInstance.Post('/disable_motor_1')
    default:
      throw new Error('无效的电机索引')
  }
}

// 设置电机速度
export const setMotorSpeed = (motorIndex: number, payload: SetMotorSpeedRequest) => {
  switch (motorIndex) {
    case 0:
      return alovaInstance.Post('/set_motor_0_speed', payload)
    case 1:
      return alovaInstance.Post('/set_motor_1_speed', payload)
    default:
      throw new Error('无效的电机索引')
  }
}