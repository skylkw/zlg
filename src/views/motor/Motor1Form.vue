<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import FormSelectField from '@/components/form/FormSelectField.vue'
import FormInputField from '@/components/form/FormInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { enableMotor, disableMotor, setMotorSpeed } from '@/api/methods/motor.ts'
import { useRequest } from 'alova/client'

const appStore = useAppStore()

const { send: enableMotorRequest } = useRequest(enableMotor, { immediate: false })
const { send: disableMotorRequest } = useRequest(disableMotor, { immediate: false })
const { send: setMotorSpeedRequest } = useRequest(setMotorSpeed, { immediate: false })

const motor1Schema = toTypedSchema(
  z.object({
    motorMode1: z.string({ required_error: '请选择电机模式' }),
    motorValue1: z.string({ required_error: '请输入速度/扭矩值' }),
    motorGear1: z.string({ required_error: '请选择挡位' }),
  })
)

const { handleSubmit: handleMotor1Submit, resetForm: resetMotor1Form } = useForm({
  validationSchema: motor1Schema,
  initialValues: {
    motorMode1: '2',
    motorValue1: '0',
    motorGear1: '2',
  },
})

const enableMotor1 = async () => {
  await enableMotorRequest(1)
  appStore.motor1Status = true
  startSSE(1)
}

const disableMotor1 = async () => {
  stopSSE(1)
  await disableMotorRequest(1)
  appStore.motor1Status = false
}

const onMotor1Submit = handleMotor1Submit(async (values) => {
  await setMotorSpeedRequest(1, {
    mode: Number(values.motorMode1),
    value: Number(values.motorValue1),
    gear: Number(values.motorGear1),
  })
})

const motor1FormItems = [
  {
    type: 'select',
    name: 'motorMode1',
    label: '电机工作模式',
    placeholder: '选择电机工作模式',
    defaultValue: '2',
    options: [
      { value: '0', label: '停止' },
      { value: '1', label: '扭矩模式' },
      { value: '2', label: '速度模式' },
    ],
    required: true,
  },
  {
    type: 'input',
    name: 'motorValue1',
    defaultValue: '0',
    label: '速度/扭矩值',
    placeholder: '输入速度/扭矩值',
    required: true,
  },
  {
    type: 'select',
    name: 'motorGear1',
    label: '挡位',
    placeholder: '选择挡位',
    defaultValue: '2',
    options: [
      { value: '0', label: 'N' },
      { value: '1', label: 'R' },
      { value: '2', label: 'D' },
    ],
    required: true,
  },
]

let eventSource1: EventSource | null = null

const startSSE = (chn: number) => {
  if (chn === 1) {
    if (eventSource1) {
      eventSource1.close()
    }
    eventSource1 = new EventSource(`http:localhost:8000/sse/${chn}`)
    eventSource1.onopen = (event) => {
      console.log('SSE connection opened for motor 1', event)
    }
    eventSource1.onmessage = (event) => {
      appStore.motor1Data = event.data
    }
    eventSource1.onerror = (err) => {
      console.error('SSE error for motor 1:', err)
      eventSource1?.close()
    }
  }
}

const stopSSE = (chn: number) => {
  if (chn === 1) {
    if (eventSource1) {
      eventSource1.close()
      eventSource1 = null
    }
  }
}
</script>

<template>
  <Card class="flex flex-col h-full">
    <CardHeader>
      <CardTitle>电机1控制</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <Button v-if="appStore.motor1Status" @click="disableMotor1" class="w-full">关闭电机</Button>
      <Button v-else @click="enableMotor1" class="w-full">打开电机</Button>
      <form @submit.prevent="onMotor1Submit" class="flex flex-col flex-1 mt-4">
        <div class="flex flex-col gap-y-4 flex-1">
          <template v-for="field in motor1FormItems">
            <FormSelectField
              v-if="field.type === 'select'"
              :name="field.name"
              :label="field.label"
              :placeholder="field.placeholder"
              :options="field.options || []"
              :defaultValue="field.defaultValue"
              :required="field.required" />

            <FormInputField
              v-else-if="field.type === 'input'"
              :name="field.name"
              :label="field.label"
              :placeholder="field.placeholder"
              :required="field.required" />
          </template>
        </div>
        <FormItem class="mt-4">
          <Button type="submit" class="w-full" :disabled="!appStore.motor1Status">设置速度/扭矩</Button>
        </FormItem>
      </form>
    </CardContent>
  </Card>
</template>