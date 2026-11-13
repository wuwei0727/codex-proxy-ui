<script setup lang="ts">
import type { FormInstance, FormRules } from '@codex-proxy/ui'
import { ZButton, ZForm, ZFormItem, ZInput, ZInputNumber, ZTextarea } from '@codex-proxy/ui'
import { reactive, ref, useTemplateRef } from 'vue'

interface RuleForm { name: string, order: number, description: string }
const form = useTemplateRef<FormInstance>('form')
const model = reactive<RuleForm>({ name: '请求工作台', order: 0, description: '为指定请求添加响应标记' })
const result = ref('')
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请填写配置名称', trigger: 'blur' },
    { min: 3, max: 12, message: '名称长度为 3 到 12 个字符', trigger: 'blur' },
  ],
  order: { type: 'integer', min: 0, message: '执行顺序必须为非负整数', trigger: 'change' },
})
async function save() {
  const valid = await form.value?.validate().catch(() => false)
  result.value = valid ? `已保存：${model.name}` : ''
}
function reset() {
  form.value?.resetFields()
  result.value = ''
}
</script>

<template>
  <div class="demo-stack w-full">
    <ZForm ref="form" :model="model" :rules="rules" label-position="right" label-width="auto" scroll-to-error focus-on-error novalidate @submit="save">
      <ZFormItem prop="name" label="配置名称">
        <ZInput v-model="model.name" placeholder="填写名称" clearable />
      </ZFormItem>
      <ZFormItem prop="order" label="执行顺序">
        <ZInputNumber v-model="model.order" aria-label="执行顺序" :min="0" class="demo-wide" />
      </ZFormItem>
      <ZFormItem prop="description" label="说明">
        <ZTextarea v-model="model.description" :autosize="{ minRows: 2, maxRows: 5 }" />
      </ZFormItem>
      <div class="demo-row">
        <ZButton type="primary" native-type="submit">
          校验并保存
        </ZButton>
        <ZButton @click="reset">
          重置
        </ZButton>
        <ZButton @click="form?.clearValidate()">
          清空校验
        </ZButton>
      </div>
      <output v-if="result" aria-label="保存结果">{{ result }}</output>
    </ZForm>
  </div>
</template>
