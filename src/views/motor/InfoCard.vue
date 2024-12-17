<script setup lang="ts">
  import { defineProps } from 'vue'

  // 定义 props 类型
  const props = defineProps<{
    label: string
    value: string | number
  }>()
</script>

<template>
  <div
    class="flex items-center justify-between text-sm border rounded-md p-2.5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-accent/50">
    <div class="font-semibold tracking-wide truncate text-base">
      {{ label }}
    </div>
    <span class="text-xs" title="{{ value }}">
      {{ value }}
    </span>
  </div>
</template>