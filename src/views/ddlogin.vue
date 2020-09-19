<!--  -->
<template>
  <div class="login-box" @keyup.enter="login">

    <div>
      1
    </div>
    <div class="login-container demo-input-suffix">
      <el-form :model="form" label-width="1.3rem" id="FORM" style="margin-top:0.15rem">
        <el-form-item label="" hide-required-asterisk>
          <el-input style="width:76%" v-model="form.username" clearable placeholder="请输入用户名">
            <i slot="prefix" class="el-input_icon el-icon-user" style="color:#02EEFF;font-size:20px;"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input style="width:76%" v-model="form.password" type="password" clearable placeholder="请输入密码">
            <i slot="prefix" class="el-input_icon el-icon-goods" style="color:#02EEFF;font-size:20px;"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.captcha" style="width:1.9rem;float:left" clearable placeholder="请输入验证码">
            <i slot="prefix" class="el-input_icon el-icon-picture" style="color:#02EEFF;font-size:20px;"></i>
          </el-input>
          <p style="float:left;width:1.76rem;margin-left:.15rem">
            <img style="width:100%;height:100%" alt="验证码" :src="srcyzm" id="code" @click="showImageCode" />
          </p>
        </el-form-item>
        <el-button type="primary" class="btn" @click="login">asdfasdf </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {
    getUUID
  } from '@/utils/util'
  export default {
    data() {
      return {
        form: {
          username: 'admin',
          password: '123456'
        },
        srcyzm: '',
        code: ''
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      console.log(1)
      this.showImageCode()
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    },
    methods: {
      jianting(data) {
        console.log(data)
      },
      showImageCode() {
        this.form.uuid = getUUID()
        // 显示验证码
        this.srcyzm = '/apiUrl/captcha.jpg?uuid=' + this.form.uuid
      },
      //登录
      login() {
        let loginParams = {}
        loginParams.username = this.form.username
        // Base64.encode(values.password);
        loginParams.password = this.form.password
        loginParams.captcha = this.form.captcha
        loginParams.uuid = this.form.uuid
        loginParams.isMobile = false
        var alarmdatefrom = new Date() //
        var year = alarmdatefrom.getFullYear() //获取完整的年份(4位,1970-????)
        var month = alarmdatefrom.getMonth() + 1 //获取当前月份(1-12)
        var day = alarmdatefrom.getDate()
        loginParams.realDay = year + '' + month + '' + day

        this.$axios
          .post('/apiUrl/emgy/sys/login', loginParams)
          .then(resData => {
            // console.log(resData)
            if (resData.code == 0) {
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success' //error success
              })
              sessionStorage.setItem("token", resData.security_monitor_token)
              this.$router.push({
                path: '/ddindex',
                query: {}
              })
            } else {
              this.$message({
                showClose: true,
                message: resData.msg,
                type: 'warning' //error success
              })
              this.showImageCode()
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>
<style lang='less' scoped>
  /* @import url(); 引入css类 */
  #video1 {
    width: 8rem; // height: 3rem;
    outline: none;
  }

  html,
  body {
    padding: 0;
    margin-top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .login-box {
    width: 100%;
    height: 100%;
    background: url('../assets/imgs/background.png') no-repeat;
    background-size: 100% 100%;
    min-height: 100vh;
    overflow: hidden;
    position: relative;

    .login-container {
      width: 6.35rem;
      height: 3.94rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      background: url('../assets/imgs/login_form.png') no-repeat;
      background-size: 100% 100%;
      padding-top: .35rem;

      .login-header {
        width: 100%;
        height: 0.68rem;
        padding-top: 15px;
        margin-bottom: 0.45rem;

        p {
          display: block;
          text-align: center;
          margin: 0 auto;
          font-size: 0.25rem;
          color: #fff;
          width: 1.6rem;
          height: 0.53rem;
          border-bottom: 0.01rem solid #1890ff;
          padding-top: 0.1rem;
          box-sizing: border-box;
        }
      }
    }
  }

  .btn {
    border: none;
    height:.5rem;
    width: 3.11rem;
    font-size: 0.16rem;
    background: url("../assets/imgs/bg-btn.png") no-repeat;
    background-size: 100% 100%;
    color: #02EEFF;
    border-radius: 5px;
    float: right;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  /deep/ .el-form-item__label {
    font-size: 0.2rem;
    color: #fff;
  }

  /deep/ .el-form-item {
    // margin-bottom: 0.5rem;
  }

  /deep/ .el-input__inner {
    background-color: transparent;
    border: 1px solid #02EEFF;
    color: #02EEFF;
  }
</style>