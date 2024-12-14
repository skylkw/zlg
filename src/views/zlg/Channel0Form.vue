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

const channelSchema = toTypedSchema(
  z.object({
    baudRate: z.string({ required_error: '请选择波特率' }),
    canType: z.string({ required_error: '请选择CAN类型' }),
    filterMode: z.string(),
  })
)

const { handleSubmit: handleChannelSubmit, resetForm: resetChannelForm } = useForm({
  validationSchema: channelSchema,
  initialValues: {
    baudRate: '500000',
    canType: '0',
    filterMode: 'None',
  },
})

const onChannelSubmit = handleChannelSubmit(async (values) => {
  if (!appStore.channel0Status) {
    await openChannelRequest(0, Number(values.baudRate), Number(values.canType))
    appStore.channel0Status = true
  } else {
    await closeChannelRequest(0)
    appStore.channel0Status = false
  }
})

const channelFormItems = [
  {
    name: 'baudRate',
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
    name: 'canType',
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
      <form @submit.prevent="onChannelSubmit" class="flex flex-col flex-1">
        <div class="flex flex-col gap-y-4 flex-1">
          <FormSelectField
            v-for="field in channelFormItems"
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