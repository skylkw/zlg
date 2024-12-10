<script setup lang="ts">
  import { computed } from 'vue'
  import { useAppStore } from '@/stores/useAppStore'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { Switch } from '@/components/ui/switch'
  import Motor0Form from './Motor0Form.vue'
  import Motor1Form from './Motor1Form.vue'

  const appStore = useAppStore()
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
    <Motor0Form />
    <Motor1Form />

    <!-- 只读状态显示 -->
    <Card class="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>电机0状态显示</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid">
          <div class="flex items-center">
            <Switch :checked="appStore.motor0Status" />
            <span class="ml-3">电机0状态: {{ appStore.motor0Status ? '开启' : '关闭' }}</span>
            {{ appStore.motor0Data }}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>电机1状态显示</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid">
          <div class="flex items-center">
            <Switch :checked="appStore.motor1Status" />
            <span class="ml-3">电机1状态: {{ appStore.motor1Status ? '开启' : '关闭' }}</span>
            {{ appStore.motor1Data }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>