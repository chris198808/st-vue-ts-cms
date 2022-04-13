<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="" class="img" />
      <template v-if="!isCollapse">
        <h3 class="title">Vue+TS</h3>
      </template>
    </div>
    <el-menu
      class="el-menu"
      active-text-color="#286fc3"
      background-color="#041630"
      text-color="#8d98a6"
      default-active="2"
      :collapse="isCollapse"
    >
      <template v-for="item in usermenus" key="item.id">
        <!-- 即有一级，又有二级 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''" :key="item.id">
            <template #title>
              <el-icon><message-box /> </el-icon>
              <template v-if="!isCollapse">
                {{ item.name }}
              </template>
            </template>
            <template v-for="childItem in item.children" :key="childItem.id"
              ><el-menu-item :index="childItem.id + ''">
                <template #title>
                  <i v-if="childItem.icon" :class="childItem.icon"></i>
                  {{ childItem.name }}
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 只有一级菜单的情况 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''" :key="item.id">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      defult: false
    }
  },
  setup() {
    const store = useStore()
    const usermenus = computed(() => {
      return store.state.loginModule.usermenus
    })

    return {
      usermenus
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
