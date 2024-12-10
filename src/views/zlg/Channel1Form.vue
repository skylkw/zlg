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

  const channel1Schema = toTypedSchema(
    z.object({
      baudRate1: z.string({ required_error: '请选择波特率' }),
      canType1: z.string({ required_error: '请选择CAN类型' }),
      filterMode1: z.string(),
    })
  )

  const { handleSubmit: handleChannel1Submit, resetForm: resetChannel1Form } = useForm({
    validationSchema: channel1Schema,
    initialValues: {
      baudRate1: '500000',
      canType1: '0',
      filterMode1: 'None',
    },
  })

  const onChannel1Submit = handleChannel1Submit(async (values) => {
    if (!appStore.channel1Status) {
      await openChannelRequest(1, Number(values.baudRate1), Number(values.canType1))
      appStore.channel1Status = true
    } else {
      await closeChannelRequest(1)
      appStore.channel1Status = false
    }
  })

  const channel1FormItems = [
    {
      name: 'baudRate1',
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
      name: 'canType1',
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
      <CardTitle>通道1控制</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <form @submit.prevent="onChannel1Submit" class="flex flex-col flex-1">
        <div class="flex flex-col gap-y-4 flex-1">
          <FormSelectField
            v-for="field in channel1FormItems"
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
            {{ !appStore.channel1Status ? '打开' : '关闭' }}
          </Button>
        </FormItem>
      </form>
    </CardContent>
  </Card>
</template>