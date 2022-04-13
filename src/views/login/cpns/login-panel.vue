<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch class="demo-tabs" v-model="currentTab">
      <el-tab-pane name="accountTab">
        <!-- #label 具名插槽语法糖：# -->
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="loginAccRef" />
      </el-tab-pane>
      <el-tab-pane name="phoneTab">
        <!-- #label 具名插槽语法糖：# -->
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="password-operate">
      <el-checkbox v-model="rememberPass" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="login"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
//1.手动导入 icons 组件
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    UserFilled,
    Iphone,

    LoginAccount,
    LoginPhone
  },
  setup() {
    let rememberPass = ref(true)
    let currentTab = ref('accountTab')
    /**
     * ts固定语法：拿到某个组件实例的类型
     * ref<InstanceType<typeof LoginAccount>>
     */
    // 拿到 login-account 组件的实例对象
    const loginAccRef = ref<InstanceType<typeof LoginAccount>>()
    const login = () => {
      // 真正的登录处理逻辑在login-account模块中进行
      if (currentTab.value === 'accountTab') {
        loginAccRef.value?.verifyLogin(rememberPass.value)
      } else {
        console.log('手机登录')
      }
    }
    return {
      rememberPass,
      loginAccRef,
      currentTab,
      login
    }
  }
})
</script>

<style lang="less">
.title {
  text-align: center;
}
.login-panel {
  width: 320px;
  margin-top: -100px;
}
.el-icon {
  margin-right: 4px;
  vertical-align: middle;
}
.password-operate {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  height: 36px;
}
</style>
