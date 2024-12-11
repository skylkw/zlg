<script setup lang="ts">
  import { defineProps, computed } from 'vue'

  // 定义 props 类型
  const props = defineProps<{
    label: string
    value: string | number
  }>()

  // 根据标签动态设置背景颜色
  const valueBgClass = computed(() => {
    switch (props.label) {
      case '速度':
        return 'bg-blue-400'
      case '扭矩':
        return 'bg-green-400'
      case '输入电压':
        return 'bg-yellow-400'
      case 'MCU 温度':
      case '电机温度':
        return 'bg-red-400'
      default:
        return 'bg-gray-400'
    }
  })
</script>

<template>
  <div
    class="flex items-center justify-between text-sm border rounded-md p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-accent/50">
    <div class="font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis text-base">
      {{ label }}
    </div>
    <span
      :class="valueBgClass"
      class="whitespace-nowrap overflow-hidden text-ellipsis px-2 py-1 text-accent/90 text-xs rounded-lg shadow-sm"
      title="{{ value }}">
      {{ value }} 
     </span>
  </div>
</template>

<style scoped>
  /* 可根据需要添加更多自定义样式 */
</style>