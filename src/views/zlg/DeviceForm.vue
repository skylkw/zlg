<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import FormSelectField from '@/components/form/FormSelectField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { openDevice, closeDevice } from '@/api/methods/zlg.ts'
import { useRequest } from 'alova/client'
import { useAppStore } from '@/stores/useAppStore'

const appStore = useAppStore()

const { send: openDeviceRequest } = useRequest(openDevice, { immediate: false })
const { send: closeDeviceRequest } = useRequest(closeDevice, { immediate: false })


const deviceSchema = toTypedSchema(
  z.object({
    deviceType: z.string({ required_error: '请选择设备类型' }),
    deviceIndex: z.string({ required_error: '请选择设备索引' }),
  })
)

const { handleSubmit: handleDeviceSubmit, resetForm: resetDeviceForm } = useForm({
  validationSchema: deviceSchema,
  initialValues: {
    deviceType: '4',
    deviceIndex: '0',
  },
})

const onDeviceSubmit = handleDeviceSubmit(async (values) => {
  if (!appStore.deviceStatus ) {
    await openDeviceRequest(Number(values.deviceType), Number(values.deviceIndex))
    appStore.deviceStatus = true
  } else {
    await closeDeviceRequest()
    appStore.deviceStatus = false
  }
})

const deviceFormItems = [
  {
    name: 'deviceType',
    label: '设备类型',
    placeholder: '选择设备类型',
    defaultValue: '4',
    options: [
      { value: '3', label: 'USBCANI' },
      { value: '4', label: 'USBCANII' },
    ],
    required: true,
  },
  {
    name: 'deviceIndex',
    label: '设备索引',
    placeholder: '选择设备索引',
    defaultValue: '0',
    options: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ],
    required: true,
  },
]
</script>

<template>
  <Card class="flex flex-col h-full">
    <CardHeader>
      <CardTitle>设备控制</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <form @submit.prevent="onDeviceSubmit" class="flex flex-col flex-1">
        <div class="flex flex-col gap-y-4 flex-1">
          <FormSelectField
            v-for="field in deviceFormItems"
            :key="field.name"
            :name="field.name"
            :label="field.label"
            :placeholder="field.placeholder"
            :options="field.options"
            :defaultValue="field.defaultValue"
            :required="field.required"
            :layout="'horizontal'" />
        </div>
        <FormItem class="mt-4">
          <Button type="submit" class="w-full">
            {{ !appStore.deviceStatus  ? '打开' : '关闭' }}
          </Button>
        </FormItem>
      </form>
    </CardContent>
  </Card>
</template>