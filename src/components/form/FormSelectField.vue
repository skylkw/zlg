<script setup lang="ts">

  import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

  import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

  const props = withDefaults(
    defineProps<{
      defaultValue?: string
      description?: string
      options: { value: string, label: string }[]
      layout?: 'horizontal' | 'vertical'
      name: string
      label: string
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
        <span v-if="props.required" class="text-primary mr-0.5">*</span>
      </FormLabel>

      <Select v-bind="componentField" :default-value="props.defaultValue">
              <FormControl class="col-span-3">
                <SelectTrigger>
                  <SelectValue :placeholder="props.placeholder" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="option in props.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
      <FormMessage class="col-start-2" />
      <FormDescription class="text-primary col-start-2 text-wrap">
        {{ props.description }}
      </FormDescription>
    </FormItem>
  </FormField>
</template>