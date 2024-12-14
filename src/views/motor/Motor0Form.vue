<script setup lang="ts">
  import { useAppStore } from '@/stores/useAppStore'
  import { Button } from '@/components/ui/button'
  import { FormItem } from '@/components/ui/form'
  import FormSelectField from '@/components/form/FormSelectField.vue'
  import FormInputField from '@/components/form/FormInputField.vue'
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import * as z from 'zod'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { enableMotor, disableMotor, setMotorSettings } from '@/api/methods/motor.ts'
  import { useRequest } from 'alova/client'

  // 获取 Pinia Store
  const appStore = useAppStore()

  // 初始化请求函数
  const { send: enableMotorRequest } = useRequest(enableMotor, { immediate: false })
  const { send: disableMotorRequest } = useRequest(disableMotor, { immediate: false })
  const { send: setMotorSettingsRequest } = useRequest(setMotorSettings, { immediate: false })

  // 定义表单验证 schema
  const motorSchema = toTypedSchema(
    z.object({
      mode: z.string({ required_error: '请选择电机模式' }),
      value: z.string({ required_error: '请输入速度/扭矩值' }),
      gear: z.string({ required_error: '请选择挡位' }),
      climb: z.string({ required_error: '请选择爬坡模式' }),
      handBrake: z.string({ required_error: '请选择手刹' }),
      footBrake: z.string({ required_error: '请选择脚刹' }),
      life: z.string({ required_error: '请输入整车life' }),
    })
  )

  // 初始化表单
  const { handleSubmit: handleMotorSubmit, resetForm: resetMotorForm } = useForm({
    validationSchema: motorSchema,
    initialValues: {
      mode: '2',
      value: '0',
      gear: '2',
      climb: '0',
      handBrake: '0',
      footBrake: '0',
      life: '0',
    },
  })

  // 启动 SSE 连接
  let eventSource: EventSource | null = null

  const startSSE = (chn: number) => {
    if (chn === 0) {
      if (eventSource) {
        eventSource.close()
      }
      // eventSource = new EventSource(`http://localhost:8000/sse/${chn}`)
      eventSource = new EventSource(`/sse/${chn}`)
      eventSource.onopen = (event) => {
      }
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          Object.assign(appStore.motor0Data, data)
        } catch (error) {
          console.error('Error parsing SSE data for motor:', error)
        }
      }
      eventSource.onerror = (err) => {
        console.error('SSE error for motor:', err)
        eventSource?.close()
      }
    }
  }

  // 关闭 SSE 连接
  const stopSSE = (chn: number) => {
    if (chn === 0) {
      if (eventSource) {
        eventSource.close()
        eventSource = null
      }
    }
  }

  // 启动电机
  const enableMotorFunc = async () => {
    await enableMotorRequest(0)
    appStore.motor0Status = true
    startSSE(0)
  }

  // 关闭电机
  const disableMotorFunc = async () => {
    stopSSE(0)
    await disableMotorRequest(0)
    appStore.motor0Status = false
    appStore.motor0Data.speed = 0
    appStore.motor0Data.position = 0
  }

  // 表单提交处理
  const onMotorSubmit = handleMotorSubmit(async (values) => {
    await setMotorSettingsRequest(0, {
      mode: Number(values.mode),
      value: Number(values.value),
      gear: Number(values.gear),
      climb: Number(values.climb),
      handBrake: Number(values.handBrake),
      footBrake: Number(values.footBrake),
      life: Number(values.life),
    })
  })

  // 定义表单项
  const motorFormItems = [
    {
      type: 'select',
      name: 'mode',
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
      name: 'value',
      defaultValue: '0',
      label: '速度/扭矩值',
      placeholder: '输入速度/扭矩值',
      required: true,
    },
    {
      type: 'select',
      name: 'gear',
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
    {
      type: 'select',
      name: 'climb',
      label: '爬坡模式',
      placeholder: '选择爬坡模式',
      defaultValue: '0',
      options: [
        { value: '0', label: '关闭' },
        { value: '1', label: '打开' },
      ],
      required: true,
    },
    {
      type: 'select',
      name: 'handBrake',
      label: '手刹',
      placeholder: '选择手刹',
      defaultValue: '0',
      options: [
        { value: '0', label: '关闭' },
        { value: '1', label: '打开' },
      ],
    },
    {
      type: 'select',
      name: 'footBrake',
      label: '脚刹',
      placeholder: '选择脚刹',
      defaultValue: '0',
      options: [
        { value: '0', label: '关闭' },
        { value: '1', label: '打开' },
      ],
    },
    {
      type: 'input',
      name: 'life',
      defaultValue: '0',
      label: '整车life',
      placeholder: '输入整车life',
      required: true,
    },
  ]

  // 监听组件卸载，关闭 SSE 连接
  import { onBeforeUnmount } from 'vue'

  onBeforeUnmount(() => {
    stopSSE(0)
  })
</script>

<template>
  <Card class="flex flex-col h-full">
    <CardHeader>
      <CardTitle>电机0控制</CardTitle>
      <!-- 控制电机显示的按钮 -->
      <div class="mt-4">
        <Button v-if="appStore.motor0Status" @click="disableMotorFunc" class="w-full">关闭电机</Button>
        <Button v-else @click="enableMotorFunc" class="w-full">打开电机</Button>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <form @submit.prevent="onMotorSubmit" class="flex flex-col flex-1 mt-4">
        <div class="flex flex-col gap-y-4 flex-1">
          <template v-for="field in motorFormItems" :key="field.name">
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
          <Button type="submit" class="w-full" :disabled="!appStore.motor0Status">设置参数</Button>
        </FormItem>
      </form>
    </CardContent>
  </Card>
</template>