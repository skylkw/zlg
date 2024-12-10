import { alovaInstance } from '..'

export interface Messages {
  [key: number]: number[]
}

// 打开设备
export const openDevice = (deviceType: number, deviceIndex: number) =>
  alovaInstance.Post('/open_device', { deviceType, deviceIndex })

// 打开通道
export const openChannel = (chn: number, baudRate: number, canType: number) =>
  alovaInstance.Post('/open_channel', { chn, baudRate, canType })

// 发送消息
export const sendMessage = (chn: number, datas: Messages, eff: number, transmitType: number) =>
  alovaInstance.Post('/send_message', { chn, datas, eff, transmitType })

// 启动自动发送消息
export const startAutoSendMessage = (chn: number, datas: number[], interval: number) =>
  alovaInstance.Post('/start_auto_send_message', { chn, datas, interval })

// 停止自动发送消息
export const stopAutoSendMessage = (chn: number) => alovaInstance.Post('/stop_auto_send_message', { chn })

// 启动接收消息
export const startReceiveMessage = (chn: number) => alovaInstance.Post('/start_receive_message', { chn })

// 停止接收消息
export const stopReceiveMessage = (chn: number) => alovaInstance.Post('/stop_receive_message', { chn })

// 关闭通道
export const closeChannel = (chn: number) => alovaInstance.Post('/close_channel', { chn })

// 关闭设备
export const closeDevice = () => alovaInstance.Post('/close_device')