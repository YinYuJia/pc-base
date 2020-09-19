<template>
  <div class="system">
    <!-- <ul>
     <li v-for="item in menuList" :key="item.index" @click="show(item.url)">{{item.name}}</li>
    </ul>-->
    <div class="header">
      <Header activeNum="5"></Header>
    </div>
    <div class="content">
      <div class="left">
        <div class="left-top">
          <img src="./side/system/system-titleLog.png" alt />
          <span class="top" @click="aaaaa">系统管理</span>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="transparent"
          text-color="#FFFFFF"
          active-text-color="#02EEFF"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="item.index" v-for="item in menuList" :key="item.index" @click="toSim(item)">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>
                <!-- <router-link :to="{path:item.url,query:{id:item.index}}">{{ item.name }}</router-link> -->
                {{ item.name }}
              </span>
            </template>
          </el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>参数配置</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项1</el-menu-item>
            <el-menu-item index="2-3">选项2</el-menu-item>
            <el-menu-item index="2-4">选项3</el-menu-item>
            <el-menu-item index="2-5">选项4</el-menu-item>
            <el-menu-item index="2-6">选项5</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>角色管理</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项1</el-menu-item>
            <el-menu-item index="3-3">选项2</el-menu-item>
            <el-menu-item index="3-4">选项3</el-menu-item>
            <el-menu-item index="3-5">选项4</el-menu-item>
            <el-menu-item index="3-6">选项5</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </div>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import { isURL } from '@/utils/validate'
// import Header from '../dd/common/Header'
import user from './user'
export default {
  components: {
    // Header,
    user
  },
  data() {
    return {
      updatePassowrdVisible: false,
      dynamicMenuRoutes: [],
      time: '',
      date: '',
      weekday: '',
      isCollapse: true,
      mainTabs: {},
      menuList: [],
      menuActiveName: '',
      mainTabsActiveName: ''
    }
  },
  computed: {
    // name: {
    //   get() {
    //     return this.$store.state.user.name;
    //   }
    // },
  },

  methods: {
    aaaaa() {
      this.$router.push({
        path:"/system"
      })
    },
    show(data) {
      console.log(data)
      this.$router.push({
        path: data
      })
    },
    toSim(item){
        console.log(item)
        this.$router.push({
          path:"/"+item.url
        })
      },
    // ----------------------------------------
    getInfo() {
      this.$axios.get('/apiUrl/sys/menu/nav').then(data => {
        console.log('----返回参数----', data)
        if (data && data.code === 0) {
          // fnAddDynamicMenuRoutes(data.menuList)
          // router.options.isAddDynamicMenuRoutes = true
          sessionStorage.setItem('menuList', JSON.stringify(data.menuList[data.menuList.length - 1].list || '[]'))
          sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
          this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
          // next({
          //   ...to,
          //   replace: true
          // })
        } else {
          sessionStorage.setItem('menuList', '[]')
          sessionStorage.setItem('permissions', '[]')
          // next()
        }
      })
    },
    collapse: function() {
      this.collapsed = !this.collapsed
      var menuWidth = document.getElementById('menuClass')
      if (menuWidth.offsetWidth === 0) {
        menuWidth.style.width = '230px'
      }
    },

    // ----------------------------------------

    zeroPadding(num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    // 路由操作
    routeHandle(route) {
      if (route.meta.isTab) {
        // tab选中, 不存在先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0]
        if (!tab) {
          if (route.meta.isDynamic) {
            route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
            if (!route) {
              return console.error('未能找到可用标签页!')
            }
          }
          tab = {
            menuId: route.meta.menuId || route.name,
            name: route.name,
            title: route.meta.title,
            type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
            iframeUrl: route.meta.iframeUrl || ''
          }
          this.mainTabs = this.mainTabs.concat(tab)
        }
        this.menuActiveName = tab.menuId + ''
        this.mainTabsActiveName = tab.name
      }
    }
  },
  watch: {
    $route: 'routeHandle'
  },
  created() {
    this.getInfo()

    this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
    this.routeHandle(this.$route)
    this.$router.push({
      path:"/sys/user"
    })
  }
}
</script>
<style lang="less" scoped>
.system {
  padding: 0;
  margin: 0;
  position: relative;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* padding-top: 10px; */
}

.content {
  width: 100%;
  height: 100vh;
  background: url('./side/blockChain/bg.png') no-repeat;
}

.left {
  width: 3.4rem;
  height: 8.99rem;
  /* background-color: red; */
  background: url('./side/tab/tab-bg.png') no-repeat;
  position: absolute;
  left: 0.5rem;
  top: 1.3rem;
}

.left-top {
  height: 0.6rem;
  padding-left: 0.35rem;
  padding-top: 0.2rem;
}

img {
  width: 0.24rem;
  height: 0.24rem;
  margin-right: 0.1rem;
}

.top {
  height: 0.36rem;
  font-size: 0.22rem;
  line-height: 0.36rem;
  color: #02eeff;
}

/deep/ .el-menu {
  border-right: 0;
}
/deep/ .el-submenu__title:hover,
/deep/ .el-menu-item:hover {
  background: transparent !important;
  color: #02eeff !important;
}
/deep/ .el-submenu__title i {
  color: #02eeff;
}
/deep/ .el-checkbox__inner {
  background-color: transparent;
  border-color: #02eeff;
}
/deep/ .el-button--primary {
  background-color: #2878ff;
  border-color: #2878ff;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #02eeff;
  border-color: #2878ff;
}
/deep/ .el-checkbox__inner::after {
  border-color: #2878ff;
}
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  background-color: #2878ff;
  border-color: #2878ff;
}

.right {
  width: 15.1rem;
  height: 8.99rem;
  padding:.3rem;
  /* background-color: green; */
  background: url('./side/liveplayer/bg.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 0.2rem;
  top: 1.3rem;
}
</style>