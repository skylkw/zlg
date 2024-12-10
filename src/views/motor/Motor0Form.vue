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


  

  const motor0Schema = toTypedSchema(
    z.object({
      motorMode0: z.string({ required_error: '请选择电机模式' }),
      motorValue0: z.string({ required_error: '请输入速度/扭矩值' }),
      motorGear0: z.string({ required_error: '请选择挡位' }),
    })
  )

  const { handleSubmit: handleMotor0Submit, resetForm: resetMotor0Form } = useForm({
    validationSchema: motor0Schema,
    initialValues: {
      motorMode0: '2',
      motorValue0: '0',
      motorGear0: '2',
    },
  })

  const enableMotor0 = async () => {
    await enableMotorRequest(0)
    appStore.motor0Status = true
    startSSE(0)
  }

  const disableMotor0 = async () => {
    stopSSE(0)
    await disableMotorRequest(0)
    appStore.motor0Status = false
  }

  const onMotor0Submit = handleMotor0Submit(async (values) => {
    await setMotorSpeedRequest(0, {
      mode: Number(values.motorMode0),
      value: Number(values.motorValue0),
      gear: Number(values.motorGear0),
    })
  })

  const motor0FormItems = [
    {
      type: 'select',
      name: 'motorMode0',
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
      name: 'motorValue0',
      defaultValue: '0',
      label: '速度/扭矩值',
      placeholder: '输入速度/扭矩值',
      required: true,
    },
    {
      type: 'select',
      name: 'motorGear0',
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

  let eventSource0: EventSource | null = null

  const startSSE = (chn: number) => {
    if (chn === 0) {
      if (eventSource0) {
        eventSource0.close()
      }
      eventSource0 = new EventSource(`http:localhost:8000/sse/${chn}`)
      eventSource0.onopen = (event) => {
        console.log('SSE connection opened for motor 0', event)
      }
      eventSource0.onmessage = (event) => {
        appStore.motor0Data = event.data
      }
      eventSource0.onerror = (err) => {
        console.error('SSE error for motor 0:', err)
        eventSource0?.close()
      }
    }
  }

  const stopSSE = (chn: number) => {
    if (chn === 0) {
      if (eventSource0) {
        eventSource0.close()
        eventSource0 = null
      }
    }
  }
</script>

<template>
  <Card class="flex flex-col h-full">
    <CardHeader>
      <CardTitle>电机0控制</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <Button v-if="appStore.motor0Status" @click="disableMotor0" class="w-full">关闭电机</Button>
      <Button v-else @click="enableMotor0" class="w-full">打开电机</Button>
      <form @submit.prevent="onMotor0Submit" class="flex flex-col flex-1 mt-4">
        <div class="flex flex-col gap-y-4 flex-1">
          <template v-for="field in motor0FormItems">
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
          <Button type="submit" class="w-full" :disabled="!appStore.motor0Status">设置速度/扭矩</Button>
        </FormItem>
      </form>
    </CardContent>
  </Card>
</template>