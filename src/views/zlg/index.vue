<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { Switch } from '@/components/ui/switch'
  import DeviceForm from './DeviceForm.vue'
  import Channel0Form from './Channel0Form.vue'
  import { useAppStore } from '@/stores/useAppStore'

  const appStore = useAppStore()
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    <DeviceForm />
    <Channel0Form />

    <!-- 只读状态显示 -->
    <Card class="xl:col-span-3">
      <CardHeader>
        <CardTitle>状态显示</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-y-4">
          <div class="flex items-center">
            <Switch :checked="appStore.deviceStatus" />
            <span class="ml-3">设备状态</span>
          </div>
          <div class="flex items-center">
            <Switch :checked="appStore.channel0Status" />
            <span class="ml-3">通道0状态</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>