<template>
  <div>
    <div class="tac">
      <h5 class="mb-2">首页</h5>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>检验单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="electric">电器检验单</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon>
            <document />
          </el-icon>
          <span>一级菜单二</span>
        </el-menu-item>
        <!--    <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item> -->
        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <span>一级菜单三</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import router from '../../router';

function electric() {
  router.push('/home/electric')
}
</script>

<style lang="scss" scoped>
.tac {
  position: fixed;
  top: 0;
  left: 0;

  .mb-2 {
    font-size: 20px;
    margin: 20px 0 20px;
  }
}
</style>