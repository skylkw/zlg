<script setup lang="ts">

  import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
  import { Input } from '@/components/ui/input';

  const props = withDefaults(
    defineProps<{
      autocomplete?: string
      defaultValue?: string
      description?: string
      label: string
      layout?: 'horizontal' | 'vertical'
      name: string
      placeholder?: string
      required?: boolean
    }>(),
    {
      layout: 'horizontal',
    }
  )
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.name">
    <FormItem
      :class="props.layout === 'horizontal' ? 'grid grid-cols-4 space-y-0' : 'flex flex-col'"
      class="text-nowrap">
      <FormLabel
        :class="props.layout === 'horizontal' ? 'mr-2 flex-row-reverse' : 'mb-2'"
        class="flex items-center justify-start">
        <h3>{{ props.label }}</h3>
        <span v-if="props.required" class="text-primary-text mr-0.5">*</span>
      </FormLabel>

      <FormControl class="col-span-3">
        <Input
          v-bind="componentField"
          :autocomplete="props.autocomplete"
          :default-value="props.defaultValue || ''"
          :placeholder="props.placeholder || ''"
          class="ring-primary-400 hover:ring-1" />
      </FormControl>
      <FormMessage class="col-start-2" />
      <FormDescription class="text-primary-600 col-start-2 text-wrap">
        {{ props.description }}
      </FormDescription>
    </FormItem>
  </FormField>
</template>