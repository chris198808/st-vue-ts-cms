<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="phoneMess">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phoneMess.phoneNum" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <div class="verify">
          <el-input v-model="phoneMess.verify" placeholder="请输入验证码" />
          <el-button type="primary" class="getVerify">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phoneMess = reactive({
      phoneNum: '',
      verify: ''
    })
    const rules = {
      phoneNum: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{11}$/,
          message: '账号11位手机号',
          trigger: 'blur'
        }
      ],
      verify: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{4,}$/,
          message: '请输入4位验证码',
          trigger: 'blur'
        }
      ]
    }

    return {
      phoneMess,
      rules
    }
  }
})
</script>

<style lang="less" scoped>
.verify {
  display: flex;
}
.getVerify {
  margin-left: 6px;
}
</style>
>
