<template>
  <div class="login-account">
    <el-form :rules="rules" :model="accountMess" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountMess.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- 使用 show-password 属性即可得到一个可切换显示隐藏的密码框 -->
        <el-input
          v-model="accountMess.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import localCache from '@/utils/localCache'

import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const accountMess = reactive({
      // 空值合并，如果前面有值显示 有值的内容，否则显示 ''
      name: localCache.getLocalStorage('name') ?? '',
      password: localCache.getLocalStorage('password') ?? ''
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
          // 1. 记住密码和忘记密码
          if (rememberPass) {
            localCache.setLocalStorage('name', accountMess.name)
            localCache.setLocalStorage('password', accountMess.password)
          } else {
            localCache.deleteLocalStorage('name')
            localCache.deleteLocalStorage('password')
          }
          // 2. 进入真正的登录验证阶段
          // console.log('进入真正的登录验证阶段')
          /**
           * loginModule/accountLoginAction 给 login模块下的actions分发方法
           * loginModule 跟 store/index.ts 中导出的模块 key的名字相同
           */
          //
          store.dispatch('loginModule/accountLoginAction', { ...accountMess })
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
