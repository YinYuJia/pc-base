<template>
  <div class="header">
    <p class="title" @click="backindex">安全管理系统</p>
    <div class="nav">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4" v-for="item in colList" :key="item.index">
          <div :class="{'grid-content':true,'active':item.id == activeNum}" @click="selected(item)">
            {{item.name}}
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      activeNum: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        colList: [{
            name: "电子地图",
            id: 1
          },

          {
            name: "链上数据",
            id: 2
          },

          {
            name: "工程管理",
            id: 3
          },
          {
            name: "大数据分析",
            id: 4
          },
          {
            name: "系统设置",
            id: 5
          },
        ]
      };
    },
    computed: {

    },
    created() {
      this.getInfo()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      getInfo() { //获取权限信息
        this.$axios.get('/apiUrl/sys/menu/nav').then(data => {
          console.log('----获取权限信息----', data.menuList)
          if (data && data.code === 0) {
            this.colList = data.menuList
          } else {

          }
        })
      },
      backindex() {
        this.$router.push({
          path: "/ddindex"
        })
      },
      selected(val) {
        console.log(val.menuId)
        if (val.menuId == 1) {
          this.$router.push({
            path: "/sys"
          })
        } else {
          this.$router.push({
            path: "/" + val.url
          })
        }
      }
    },
    components: {

    },
  };
</script>

<style scoped lang="less">
  .header {
    height: 1.08rem;
    background: url("../../../assets/index/header-bg.png") no-repeat;
    background-size: 100% 100%;

    .title {
      float: left;
      width: 2.33rem;
      height: .35rem;
      font-size: .36rem;
      font-family: Noto Sans S Chinese;
      font-weight: bold;
      color: rgba(2, 238, 255);
      background-color: transparent;
      line-height: .25rem;
      margin-top: .23rem;
      margin-left: .82rem;
    }

    .nav {
      height: .44rem;
      width: 10rem;
      margin-left: 6.8rem;
      margin-top: .25rem;

    }
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
      background-color: transparent;
    }
  }

  .el-col {
    border-radius: 4px;
    cursor: pointer;
  }

  .grid-content {
    border-radius: 4px;
    min-height: .44rem;
    background: url("../../../assets/index/unselected.png") no-repeat;
    background-size: 100% 100%;
    font-size: .24rem;
    font-weight: 400;
    line-height: .44rem;
    text-align: center;
    color: rgba(2, 238, 255, 1);
  }

  .active {
    border-radius: 4px;
    min-height: .44rem;
    background: url("../../../assets/index/selected.png") no-repeat;
    background-size: 100% 100%;
    font-size: .24rem;
    font-weight: 400;
    line-height: .44rem;
    text-align: center;
    color: rgba(254, 255, 255, 1);
  }

  .row-bg {
    background-color: #f9fafc;
  }
</style>