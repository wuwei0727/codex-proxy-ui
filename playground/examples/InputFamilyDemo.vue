<script setup lang="ts">
import type { ComponentSize, DatePickerValue } from '@codex-proxy/ui'
import { ZDatePicker, ZFormItem, ZInput, ZInputNumber, ZInputTag, ZSegmented, ZSelect, ZTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const size = ref<ComponentSize>('default')
const sizes = [{ label: '小', value: 'small' }, { label: '中', value: 'default' }, { label: '大', value: 'large' }]
const text = ref('生产环境')
const tags = ref(['生产环境', '测试环境'])
const options = ['生产环境', '测试环境', '开发环境'].map(value => ({ value, label: value }))
const single = ref('生产环境')
const multiple = ref(['生产环境', '测试环境'])
const date = ref<DatePickerValue>('2026-11-13')
const range = ref<DatePickerValue>(['2026-11-13', '2026-11-20'])
const number = ref(10)
const note = ref('可填写多行')
</script>

<template>
  <DemoPlayground wide>
    <div>
      <ZSegmented v-model="size" :options="sizes" aria-label="控件尺寸" size="small" />
    </div>
    <div class="grid min-w-0 gap-4 sm:grid-cols-2">
      <ZFormItem label="文本">
        <ZInput v-model="text" :size="size" clearable />
      </ZFormItem>
      <ZFormItem label="标签">
        <ZInputTag v-model="tags" :size="size" clearable />
      </ZFormItem>
      <ZFormItem label="单选">
        <ZSelect v-model="single" :options="options" :size="size" clearable />
      </ZFormItem>
      <ZFormItem label="多选">
        <ZSelect v-model="multiple" :options="options" multiple :size="size" clearable />
      </ZFormItem>
      <ZFormItem label="日期">
        <ZDatePicker v-model="date" class="w-full" value-format="YYYY-MM-DD" :size="size" />
      </ZFormItem>
      <ZFormItem label="日期范围">
        <ZDatePicker v-model="range" class="w-full" aria-label="日期范围" type="daterange" value-format="YYYY-MM-DD" :size="size" />
      </ZFormItem>
      <ZFormItem label="数量">
        <ZInputNumber v-model="number" aria-label="数量" :size="size" />
      </ZFormItem>
      <ZFormItem label="多行文本">
        <ZTextarea v-model="note" :rows="1" :size="size" autosize />
      </ZFormItem>
    </div>
  </DemoPlayground>
</template>
