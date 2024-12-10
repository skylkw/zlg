<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form'
import FormSelectField from '@/components/form/FormSelectField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { openChannel, closeChannel } from '@/api/methods/zlg.ts'
import { useRequest } from 'alova/client'
import { useAppStore } from '@/stores/useAppStore'

const { send: openChannelRequest } = useRequest(openChannel, { immediate: false })
const { send: closeChannelRequest } = useRequest(closeChannel, { immediate: false })

const appStore = useAppStore()

const channel0Schema = toTypedSchema(
  z.object({
    baudRate0: z.string({ required_error: '请选择波特率' }),
    canType0: z.string({ required_error: '请选择CAN类型' }),
    filterMode0: z.string(),
  })
)

const { handleSubmit: handleChannel0Submit, resetForm: resetChannel0Form } = useForm({
  validationSchema: channel0Schema,
  initialValues: {
    baudRate0: '500000',
    canType0: '0',
    filterMode0: 'None',
  },
})

const onChannel0Submit = handleChannel0Submit(async (values) => {
  if (!appStore.channel0Status) {
    await openChannelRequest(0, Number(values.baudRate0), Number(values.canType0))
    appStore.channel0Status = true
  } else {
    await closeChannelRequest(0)
    appStore.channel0Status = false
  }
})

const channel0FormItems = [
  {
    name: 'baudRate0',
    label: '波特率',
    placeholder: '选择波特率',
    defaultValue: '500000',
    options: [
      { value: '500000', label: '500K' },
      { value: '250000', label: '250K' },
      { value: '125000', label: '125K' },
    ],
    required: true,
  },
  {
    name: 'canType0',
    label: 'CAN类型',
    placeholder: '选择CAN类型',
    defaultValue: '0',
    options: [
      { value: '0', label: 'CAN' },
      { value: '1', label: 'CANFD' },
    ],
    required: true,
  },
]
</script>

<template>
  <Card class="flex flex-col h-full">
    <CardHeader>
      <CardTitle>通道0控制</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <form @submit.prevent="onChannel0Submit" class="flex flex-col flex-1">
        <div class="flex flex-col gap-y-4 flex-1">
          <FormSelectField
            v-for="field in channel0FormItems"
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
          <Button type="submit" class="w-full" :disabled="!appStore.deviceStatus">
            {{ !appStore.channel0Status ? '打开' : '关闭' }}
          </Button>
        </FormItem>
      </form>
    </CardContent>
  </Card>
</template>