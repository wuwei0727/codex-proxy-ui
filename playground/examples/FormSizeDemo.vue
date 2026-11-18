<script setup lang="ts">
import type { ComponentSize, FormInstance } from '@codex-proxy/ui'
import { ZButton, ZConfigProvider, ZForm, ZFormItem, ZInput, ZSegmented, ZSelect, ZSwitch } from '@codex-proxy/ui'
import { reactive, ref, useTemplateRef } from 'vue'

const sizes = [{ value: 'small', label: '小' }, { value: 'default', label: '默认' }, { value: 'large', label: '大' }]
const size = ref<ComponentSize>('default')
const form = useTemplateRef<FormInstance>('form')
const fields = reactive({ name: '', channel: undefined as string | undefined, notify: false })
const channels = [{ value: 'email', label: '邮件' }, { value: 'webhook', label: 'Webhook' }]
</script>

<template>
  <div class="demo-stack w-full">
    <ZSegmented v-model="size" :options="sizes" aria-label="表单尺寸" />
    <ZConfigProvider :size="size">
      <ZForm ref="form" :model="fields" novalidate :show-message="false" @submit="form?.validate().catch(() => false)">
        <ZFormItem label="订阅名称" prop="name" required>
          <ZInput v-model="fields.name" placeholder="填写名称" :validate-event="false" clearable />
        </ZFormItem>
        <ZFormItem label="通知渠道" prop="channel" required>
          <ZSelect v-model="fields.channel" class="w-full" :options="channels" placeholder="选择渠道" :validate-event="false" clearable />
        </ZFormItem>
        <ZFormItem prop="notify" size="small">
          <ZSwitch v-model="fields.notify" label="接收摘要（固定小尺寸）" />
        </ZFormItem>
        <div class="demo-row">
          <ZButton type="primary" native-type="submit">
            校验
          </ZButton>
          <ZButton size="default" @click="form?.resetFields()">
            重置（固定默认尺寸）
          </ZButton>
        </div>
      </ZForm>
    </ZConfigProvider>
  </div>
</template>
