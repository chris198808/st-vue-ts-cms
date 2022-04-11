<template>
  <div class="login-account">
    <el-form :rules="rules" :model="accountMess" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountMess.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountMess.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from '@/utils'

export default defineComponent({
  setup() {
    const accountMess = reactive({
      name: '',
      password: ''
    })
    // 实例的类型 ElForm 组件实例
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 点击 立即登录 后实际执行的账号登录的逻辑
    const verifyLogin = (rememberPass: boolean) => {
      /**
       * ElForm表单验证后返回一个validate方法，
       * 传入一个回调函数，验证通过返回 true，验证没有通过返回 false
       */
      formRef.value?.validate((valid) => {
        if (valid) {
          if (rememberPass) {
            setLocalStorage('name', accountMess.name)
            setLocalStorage('password', accountMess.password)
          } else {
            deleteLocalStorage('name')
            deleteLocalStorage('password')
          }
          console.log('进入真正的登录验证阶段')
        }
      })
      return '验证登录'
    }
    const rules = {
      name: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 8,
          message: '账号长度需要6~8位',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{6,}$/,
          message: '密码需要6位的字母或数字',
          trigger: 'blur'
        }
      ]
    }

    return {
      accountMess,
      verifyLogin,
      formRef,
      rules
    }
  }
})
</script>

<style scoped></style>
