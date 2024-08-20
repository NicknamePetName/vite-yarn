<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { setStorage } from '../../utils/storage'
import router from '../../router'
import { registerRequest } from '../../api/register'

const userName = ref('')
const password = ref('')
const confirmPwd = ref('')
const isChecked = ref(false)




async function handleSubmit() {

  if (!userName.value.trim()) {
    ElMessage.error({ message: "用户名不能为空", center: true })
    return false
  }
  if (!password.value.trim()) {
    ElMessage.error({ message: "密码不能为空", center: true })
    return false
  }
  if (!confirmPwd.value.trim()) {
    ElMessage.error({ message: "确认密码不能为空", center: true })
    return false
  }
  if (confirmPwd.value.trim() !== password.value.trim()) {
    ElMessage.error({ message: "两次输入密码不一致", center: true })
    return false
  }
  if (!isChecked.value) {
    ElMessage.error({ message: "请先同意服务条款", center: true })
    return false
  }

  try {
    const res = await registerRequest({ userName: userName.value, password: password.value })
    
    if (res.isSuccess) {
      ElMessage.success({ message: res.message, center: true })
      setStorage('token', res.token)
      router.push('/login')
      
    } else {
      ElMessage.error({ message: res.message, center: true })
    }
  } catch (error) {
    ElMessage.error({ message: "注册失败", center: true })
  }
}

async function login() {
    router.push("/login")
}

</script>

<template>
  <div id="login">
    <div class="background">
      <div class="head"></div>
      <div class="loginFrom">
        <div class="loginyixin">欢迎注册QQ</div>
        <p>每一天，乐在沟通。</p>
        <div class="userName">
          <input type="text" placeholder="昵称" v-model="userName" />
        </div>
        <div class="password">
          <input type="password" placeholder="密码" v-model="password" />
          <input type="password" placeholder="确认密码" v-model="confirmPwd" @keypress.enter="handleSubmit"/>
        </div>
        <div class="agreement-wrap">
          <input class="agreement" type="checkbox" v-model="isChecked">
          <span>
            我已阅读并同意
            <a href="#" class="text-link">服务协议</a>
            和
            <a href="#" class="text-link">QQ隐私保护指引</a>
          </span>
        </div>
        <button type="submit" class="submit-login" @click="handleSubmit">
          注册
        </button>
        <div class="loginFoot clearfix">
          <a href="#" class="a-left" @click="">忘记密码</a>
          <a href="/login" class="a-right" @click="login">登录账户</a>
        </div>
        <div class="footer">
          Copyright © 1998-2024 Yixin All Rights Reserved.
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
#login {
  margin-top: -8px;
  margin-left: -8px;



  .background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url(@/assets/login.png) no-repeat center;
    // background: url(http://10.1.99.100:801/eportal/extern/ZqtpVJ1634618461/Z6eodz1634618493/3195317a808ec8fd8acfe26d39cdb4e9.png) no-repeat center;
    background-size: 100% 100%;
  }

  .head {
    position: absolute;
    top: 59px;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, .06);
    transform: scaleY(.5);
    transform-origin: 0 100%;
  }

  .loginFrom {
    margin: 90px auto;
    padding: 30px 35px;
    width: 500px;
    // border: 2px solid #aaaaaa;

    .loginyixin {
      width: 400px;
      height: 57px;
      margin-left: 103px;
      margin-bottom: 8px;
      font-family: "PingFang SC";
      font-size: 38px;
      font-weight: 400;
      color: #000000;
      text-align: left;
    }

    p {
      width: 261px;
      height: 24px;
      margin-top: 0;
      margin-left: 103px;
      margin-bottom: 32px;
      font-family: "PingFang SC";
      font-size: 19px;
      font-weight: 400;
      line-height: 20px;
      color: #000000;
      text-align: left;
    }

    .userName input,
    .password input {
      width: 311px;
      height: 37px;
      margin-left: 10px;
      margin-bottom: 22px;
      padding: 8px;
      box-sizing: border-box;
      font-family: "PingFang SC";
      text-align: left;
      line-height: 1.3;
      font-size: 14px;
      font-weight: 400;
      color: var(--text-primary);
      background-color: rgba(255, 255, 255, .6);
      border: 1px solid transparent;
      border-radius: 4px;
    }

    input:focus {
      border-color: #2E77E5;
      /* 蓝色边框 */
      outline: none;
      /* 可选：去除默认的轮廓线 */
    }

    .agreement-wrap {
      width: 280px;
      height: 18px;
      line-height: 1.5;
      font-size: 12px;
      margin-top: -20px;
      margin-left: 90px;

      .agreement {
        -webkit-appearance: none;
        /* 移除Webkit浏览器的默认样式 */
        -moz-appearance: none;
        /* 移除Firefox的默认样式 */
        appearance: none;
        /* 移除其他浏览器的默认样式 */

        position: relative;
        /* 使背景图片相对于这个元素定位 */
        top: 7px;
        width: 16px;
        /* 根据图片大小调整 */
        height: 16px;
        /* 根据图片大小调整 */
        outline: none;
        /* 移除轮廓 */
        cursor: pointer;
        /* 改变鼠标指针形状 */

        background-image: url('@/assets/icon-check.png');
        background-position: 50% 50%;
        background-size: contain;


      }

      .agreement::before {
        content: '';
        /* 创建一个伪元素 */
        display: block;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/icon-check-r.png');
        background-position: 50% 50%;
        background-size: contain;
        /* 根据需要调整，cover会覆盖整个元素，contain会保持图片比例填充元素 */
        opacity: 0;
        /* 初始时不显示背景图片 */
        transition: opacity 0.3s;
        /* 过渡效果 */
      }

      .agreement:checked::before {
        opacity: 1;
        /* 当复选框被选中时显示背景图片 */
      }

      span {
        display: inline-block;

        .text-link {
          color: #2B72FF;
        }
      }
    }

    .submit-login {
      width: 311px;
      height: 43px;
      margin-top: 32px;
      margin-left: 7px;
      padding: 11px 0 11px 0;
      border-radius: 4px;
      border: solid 1px #3083ff;
      background-color: #3083ff;
      box-shadow: 0 5px 8px 0 #185fff;
      font-size: 14px;
      font-weight: 100;
      color: #ffffff;
      text-align: center;
      line-height: 1.5;
      cursor: pointer;
    }

    button:focus {
      outline: none;
      /* 移除焦点时的默认黑色边框 */
    }

    .loginFoot {

      .a-left,
      .a-right {
        float: left;
        display: block;
        width: 60px;
        height: 13px;
        font-family: "PingFang SC";
        font-size: 15px;
        font-weight: 400;
        line-height: 13px;
        color: #aaaaaa;
        text-align: left;
        text-decoration: none;
        margin-top: 15px;
        margin-left: 100px;
        cursor: pointer;
      }

      .a-right {
        float: right;
        margin-right: 95px;
      }
    }

    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }

    .footer {
      width: 100%;
      padding: 20px 0;
      line-height: 1.5;
      font-size: 12px;
      color: #999;
      text-align: center;
      margin-top: 31px;
    }
  }
}
</style>